export type ScraperErrorCode =
  | 'empty_query'
  | 'invalid_category'
  | 'invalid_page'
  | 'invalid_sort'
  | 'timeout'
  | 'provider_unavailable'
  | 'rate_limited'
  | 'forbidden'
  | 'http_error'
  | 'invalid_html'
  | 'layout_changed'
  | 'parse_failed'
  | 'unknown';

type ScraperErrorOptions = {
  code: ScraperErrorCode;
  message: string;
  retryable?: boolean;
  status?: number;
  cause?: unknown;
};

export class ScraperError extends Error {
  code: ScraperErrorCode;
  retryable: boolean;
  status?: number;

  constructor({
    code,
    message,
    retryable = false,
    status,
    cause,
  }: ScraperErrorOptions) {
    super(message, { cause });
    this.name = 'ScraperError';
    this.code = code;
    this.retryable = retryable;
    this.status = status;
  }
}

export function toScraperError(error: unknown): ScraperError {
  if (error instanceof ScraperError) {
    return error;
  }

  return new ScraperError({
    code: 'unknown',
    message: 'An unknown scraper error occurred.',
    cause: error,
  });
}
