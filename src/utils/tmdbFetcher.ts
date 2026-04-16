import { fetcher } from "./fetcher";
import TMDBError from "../TMDBError";

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

const isTmdbError = (error: unknown): error is TmdbError => {
  return (
    error instanceof Object &&
    "status_code" in error &&
    "status_message" in error &&
    "success" in error
  );
};

export const tmdbFetcher = async <T>(
  endpoint: string,
  options: RequestInit = {},
) => {
  const defaultOptions = {
    method: "GET",
    ...options,
    headers: {
      contentType: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      ...options.headers,
    },
  };

  try {
    const response = await fetcher<T, TmdbError>(
      `${import.meta.env.VITE_TMDB_BASE_URL}${endpoint}`,
      defaultOptions,
    );
    return response;
  } catch (error) {
    if (isTmdbError(error)) {
      throw new TMDBError(error);
    }
    throw error;
  }
};
