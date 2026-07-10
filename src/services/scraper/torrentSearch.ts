import { TorrentSearchParams, TorrentSearchResponse } from '@/models/torrent';
import {
  defaultHttpClient,
  HttpClient,
} from '@/services/networking/httpClient';
import { parseTorrentSearchHtml } from '@/services/parser/torrentParser';
import {
  buildPirateBaySearchUrl,
  normalizePirateBaySearchParams,
} from '@/services/scraper/pirateBayUrl';

type SearchTorrentsDeps = {
  httpClient?: HttpClient;
  parser?: (html: string) => TorrentSearchResponse['results'];
  urlBuilder?: (params: TorrentSearchParams) => string;
};

export async function searchTorrents(
  params: TorrentSearchParams,
  deps: SearchTorrentsDeps = {},
): Promise<TorrentSearchResponse> {
  const normalizedParams = normalizePirateBaySearchParams(params);
  const url = (deps.urlBuilder ?? buildPirateBaySearchUrl)(normalizedParams);
  const html = await (deps.httpClient ?? defaultHttpClient).get(url);
  const results = (deps.parser ?? parseTorrentSearchHtml)(html);

  return {
    ...normalizedParams,
    results,
  };
}
