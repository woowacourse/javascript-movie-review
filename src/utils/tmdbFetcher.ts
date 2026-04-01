import { fetcher } from "./fetcher";

export interface TmdbPagination<T> {
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
}

export interface TmdbError {
  status_code: number;
  status_message: string;
  success: false;
}

export const tmdbFetcher = async <T>(
  endpoint: string,
  options: RequestInit = {},
) => {
  const defaultOptions = {
    method: "GET",
    ...options,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      ...options.headers,
    },
  };

  return await fetcher<T, TmdbError>(
    `${import.meta.env.VITE_TMDB_BASE_URL}${endpoint}`,
    defaultOptions,
  );
};
