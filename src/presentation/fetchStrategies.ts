import { fetchMovies, fetchSearchedMovies, type MoviePage } from '../movieAPIResponse.ts';
export type { MoviePage };

export type FetchStrategy = (page: number, signal: AbortSignal) => Promise<MoviePage>;

export const popularStrategy: FetchStrategy = (page, signal) =>
  fetchMovies(page, signal);

export const searchStrategy = (keyword: string): FetchStrategy =>
  (page, signal) => fetchSearchedMovies(keyword, page, signal);
