import HttpError from './HttpError';
import { ENV } from './env';

export const QUERY_PARAMS = {
  MOVIE: 'movie/popular',
  SEARCH: 'search/movie',
} as const;

export default class Fetcher {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + ENV.VITE_TMBD_HEADER,
      },
      method: 'GET',
    });

    if (!response.ok) {
      throw new HttpError(response.status);
    }

    return response.json();
  }
}
