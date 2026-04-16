import type {
  FetchMovieDetailResponse,
  FetchMoviePageDataResponse,
  TmdbFetchMoviePageDataResponse,
  TmdbMovieDetailResponse,
} from "./api.types";
import {
  createMovieApiUrl,
  createMovieDetailApiUrl,
  createRequestOptions,
  mapFetchMovieDetailResponse,
  mapFetchMoviePageDataResponse,
} from "./apiBuilder";
import { API_REQUEST_TIMEOUT_MS } from "../constants/constant";

const TIMEOUT_ERROR_MESSAGE = "영화 정보를 불러오는데 시간이 너무 오래 걸립니다. 다시 시도해주세요.";

const fetchTmdbData = async <T>(url: URL): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...createRequestOptions(),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`영화 정보를 불러오는데 실패했습니다: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(TIMEOUT_ERROR_MESSAGE);
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

export const fetchMoviePageData = async (page: number, query: string = ""): Promise<FetchMoviePageDataResponse> => {
  const data = await fetchTmdbData<TmdbFetchMoviePageDataResponse>(createMovieApiUrl(page, query));

  return mapFetchMoviePageDataResponse(data);
};

export const fetchMovieDetail = async (movieId: number): Promise<FetchMovieDetailResponse> => {
  const data = await fetchTmdbData<TmdbMovieDetailResponse>(createMovieDetailApiUrl(movieId));

  return mapFetchMovieDetailResponse(data);
};
