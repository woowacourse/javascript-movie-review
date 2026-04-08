export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const ENDPOINTS = {
  POPULAR: `${TMDB_BASE_URL}/movie/popular`,
  SEARCH: `${TMDB_BASE_URL}/search/movie`,
} as const;

export const DEFAULT_PARAMS = {
  language: "ko-KR",
  include_adult: false,
} as const;
