import { describe, expect, test } from 'bun:test';

import { HttpClient } from '@/services/networking/httpClient';
import { searchTorrents } from '@/services/scraper/torrentSearch';
import { ScraperError } from '@/services/scraper/scraperErrors';

const torrent = {
  id: 'tpb-1',
  name: 'Result',
};

describe('searchTorrents', () => {
  test('composes URL builder, HTTP client, and parser dependencies', async () => {
    const urls: string[] = [];
    const httpClient: HttpClient = {
      async get(url) {
        urls.push(url);
        return '<html>fixture</html>';
      },
    };

    const response = await searchTorrents(
      {
        query: 'ubuntu',
        page: 2,
        category: 'applications',
        sort: 'uploaded_desc',
      },
      {
        httpClient,
        parser(html) {
          expect(html).toBe('<html>fixture</html>');
          return [torrent];
        },
      },
    );

    expect(urls).toEqual(['https://thepiratebay.org/search/ubuntu/1/3/300']);
    expect(response).toEqual({
      query: 'ubuntu',
      page: 2,
      category: 'applications',
      sort: 'uploaded_desc',
      results: [torrent],
    });
  });

  test('does not call dependencies when params are invalid', async () => {
    let called = false;

    try {
      await searchTorrents(
        { query: 'x', page: -1 },
        {
          httpClient: {
            async get() {
              called = true;
              return '';
            },
          },
        },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(ScraperError);
      expect((error as ScraperError).code).toBe('invalid_page');
      expect(called).toBe(false);
      return;
    }

    throw new Error('Expected invalid_page');
  });

  test('propagates HTTP and parser typed errors', async () => {
    const httpError = new ScraperError({
      code: 'timeout',
      message: 'Timed out',
      retryable: true,
    });

    await expect(
      searchTorrents(
        { query: 'ubuntu' },
        {
          httpClient: {
            async get() {
              throw httpError;
            },
          },
        },
      ),
    ).rejects.toBe(httpError);

    const parserError = new ScraperError({
      code: 'layout_changed',
      message: 'Changed layout',
    });

    await expect(
      searchTorrents(
        { query: 'ubuntu' },
        {
          httpClient: {
            async get() {
              return '<html></html>';
            },
          },
          parser() {
            throw parserError;
          },
        },
      ),
    ).rejects.toBe(parserError);
  });
});
