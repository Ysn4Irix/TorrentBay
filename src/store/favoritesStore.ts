import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Torrent } from '@/models/torrent';
import { persistentStorage } from '@/services/storage/persistentStorage';

export type FavoriteEntry = Torrent & {
  savedAt: string;
  cachedAt: string;
};

type FavoritesState = {
  favorites: FavoriteEntry[];
  isFavorite: (id: string) => boolean;
  addFavorite: (torrent: Torrent) => void;
  removeFavorite: (id: string) => void;
  restoreFavorite: (favorite: FavoriteEntry) => void;
  toggleFavorite: (torrent: Torrent) => boolean;
  clearFavorites: () => void;
};

function createFavoriteEntry(torrent: Torrent): FavoriteEntry {
  const now = new Date().toISOString();

  return {
    ...torrent,
    savedAt: now,
    cachedAt: now,
  };
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      isFavorite: (id) => get().favorites.some((item) => item.id === id),
      addFavorite: (torrent) =>
        set((state) => ({
          favorites: [
            createFavoriteEntry(torrent),
            ...state.favorites.filter((item) => item.id !== torrent.id),
          ],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== id),
        })),
      restoreFavorite: (favorite) =>
        set((state) => ({
          favorites: [
            favorite,
            ...state.favorites.filter((item) => item.id !== favorite.id),
          ],
        })),
      toggleFavorite: (torrent) => {
        const isFavorite = get().isFavorite(torrent.id);

        if (isFavorite) {
          get().removeFavorite(torrent.id);
          return false;
        }

        get().addFavorite(torrent);
        return true;
      },
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'torrentbay:favorites',
      storage: createJSONStorage(() => persistentStorage),
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);
