import { afterEach, describe, expect, test } from 'bun:test';

import { MAX_HISTORY_ENTRIES, useHistoryStore } from '@/store/historyStore';

describe('historyStore', () => {
  afterEach(() => {
    useHistoryStore.getState().clearHistory();
  });

  test('records searches newest first and moves repeated filters to top', () => {
    useHistoryStore.getState().recordSearch({
      query: 'ubuntu',
      category: 'all',
      sort: 'relevance',
    });
    useHistoryStore.getState().recordSearch({
      query: 'debian',
      category: 'applications',
      sort: 'seeders_desc',
    });
    useHistoryStore.getState().recordSearch({
      query: ' ubuntu ',
      category: 'all',
      sort: 'relevance',
    });

    expect(useHistoryStore.getState().history).toMatchObject([
      { query: 'ubuntu', category: 'all', sort: 'relevance' },
      { query: 'debian', category: 'applications', sort: 'seeders_desc' },
    ]);
  });

  test('limits history to 50 entries and supports restore', () => {
    for (let index = 0; index < MAX_HISTORY_ENTRIES + 5; index += 1) {
      useHistoryStore.getState().recordSearch({
        query: `query ${index}`,
        category: 'all',
        sort: 'relevance',
      });
    }

    expect(useHistoryStore.getState().history).toHaveLength(
      MAX_HISTORY_ENTRIES,
    );

    const entry = useHistoryStore.getState().history[3];

    if (entry) {
      useHistoryStore.getState().removeHistoryEntry(entry.id);
      expect(useHistoryStore.getState().history).not.toContainEqual(entry);

      useHistoryStore.getState().restoreHistoryEntry(entry);
      expect(useHistoryStore.getState().history).toContainEqual(entry);
    }
  });
});
