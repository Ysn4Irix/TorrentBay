import { TorrentCategory, TorrentSort } from '@/models/torrent';

export type SearchCategoryOption = {
  value: TorrentCategory;
  label: string;
  mature?: boolean;
};

export const SEARCH_CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'movies', label: 'Movies' },
  { value: 'tv_shows', label: 'TV' },
  { value: 'games', label: 'Games' },
  { value: 'applications', label: 'Apps' },
  { value: 'music', label: 'Music' },
  { value: 'anime', label: 'Anime' },
  { value: 'ebooks', label: 'Books' },
  { value: 'other', label: 'Other' },
  { value: 'adult', label: 'Adult', mature: true },
] satisfies SearchCategoryOption[];

export const SEARCH_SORTS = [
  { value: 'relevance', label: 'Best match' },
  { value: 'uploaded_desc', label: 'Newest' },
  { value: 'seeders_desc', label: 'Seeders' },
  { value: 'size_desc', label: 'Size' },
] satisfies { value: TorrentSort; label: string }[];

export function getVisibleSearchCategories(showMatureCategories: boolean) {
  return SEARCH_CATEGORIES.filter(
    (category) => showMatureCategories || !('mature' in category),
  );
}

export function getSearchCategoryLabel(category: TorrentCategory) {
  return (
    SEARCH_CATEGORIES.find((item) => item.value === category)?.label ?? 'All'
  );
}
