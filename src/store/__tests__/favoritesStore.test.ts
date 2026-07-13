import { afterEach, describe, expect, test } from 'bun:test';

import { useFavoritesStore } from '@/store/favoritesStore';

const torrent = {
  id: 'torrent-1',
  name: 'Ubuntu Desktop ISO',
  category: 'Apps',
  seeders: 100,
};

describe('favoritesStore', () => {
  afterEach(() => {
    useFavoritesStore.getState().clearFavorites();
  });

  test('adds favorites with cache timestamps and newest first de-dupe', () => {
    useFavoritesStore.getState().addFavorite(torrent);
    useFavoritesStore
      .getState()
      .addFavorite({ id: 'torrent-2', name: 'Debian' });
    useFavoritesStore.getState().addFavorite({ ...torrent, seeders: 120 });

    const favorites = useFavoritesStore.getState().favorites;

    expect(favorites).toHaveLength(2);
    expect(favorites[0]).toMatchObject({
      id: 'torrent-1',
      name: 'Ubuntu Desktop ISO',
      seeders: 120,
    });
    expect(favorites[0]?.savedAt).toBeString();
    expect(favorites[0]?.cachedAt).toBeString();
  });

  test('toggles, restores, and clears favorites', () => {
    expect(useFavoritesStore.getState().toggleFavorite(torrent)).toBe(true);
    const favorite = useFavoritesStore.getState().favorites[0];

    expect(useFavoritesStore.getState().isFavorite(torrent.id)).toBe(true);
    expect(useFavoritesStore.getState().toggleFavorite(torrent)).toBe(false);
    expect(useFavoritesStore.getState().favorites).toEqual([]);

    if (favorite) {
      useFavoritesStore.getState().restoreFavorite(favorite);
    }

    expect(useFavoritesStore.getState().favorites).toHaveLength(1);
    useFavoritesStore.getState().clearFavorites();
    expect(useFavoritesStore.getState().favorites).toEqual([]);
  });
});
