import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { TorrentCategory, TorrentSort } from '@/models/torrent';
import { persistentStorage } from '@/services/storage/persistentStorage';

export type HistoryEntry = {
  id: string;
  query: string;
  category: TorrentCategory;
  sort: TorrentSort;
  searchedAt: string;
};

type HistoryState = {
  history: HistoryEntry[];
  recordSearch: (search: {
    query: string;
    category: TorrentCategory;
    sort: TorrentSort;
  }) => void;
  removeHistoryEntry: (id: string) => void;
  restoreHistoryEntry: (entry: HistoryEntry) => void;
  clearHistory: () => void;
};

export const MAX_HISTORY_ENTRIES = 50;

function createHistoryId(
  query: string,
  category: TorrentCategory,
  sort: TorrentSort,
) {
  return `${query.trim().toLocaleLowerCase()}::${category}::${sort}`;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],
      recordSearch: ({ query, category, sort }) => {
        const normalizedQuery = query.trim();

        if (!normalizedQuery) {
          return;
        }

        const id = createHistoryId(normalizedQuery, category, sort);

        set((state) => ({
          history: [
            {
              id,
              query: normalizedQuery,
              category,
              sort,
              searchedAt: new Date().toISOString(),
            },
            ...state.history.filter((entry) => entry.id !== id),
          ].slice(0, MAX_HISTORY_ENTRIES),
        }));
      },
      removeHistoryEntry: (id) =>
        set((state) => ({
          history: state.history.filter((entry) => entry.id !== id),
        })),
      restoreHistoryEntry: (entry) =>
        set((state) => ({
          history: [
            entry,
            ...state.history.filter((item) => item.id !== entry.id),
          ]
            .sort(
              (a, b) =>
                new Date(b.searchedAt).getTime() -
                new Date(a.searchedAt).getTime(),
            )
            .slice(0, MAX_HISTORY_ENTRIES),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'torrentbay:history',
      storage: createJSONStorage(() => persistentStorage),
      partialize: (state) => ({ history: state.history }),
    },
  ),
);
