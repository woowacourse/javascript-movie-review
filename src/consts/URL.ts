const BASE_URL = process.env.BASE_URL;

export const API_URL = {
  POPULAR_MOVIES: `${BASE_URL}/movie/popular`,
  SEARCH_MOVIES: `${BASE_URL}/search/movie`,
} as const;

export const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w220_and_h330_face/';

export const QUERY_STRING_KEYS = {
  QUERY: 'query',
} as const;

export type QueryStringKeyValues = (typeof QUERY_STRING_KEYS)[keyof typeof QUERY_STRING_KEYS];

export const END_POINT = {
  SEARCH: 'search',
  POPULAR: 'popular',
} as const;

export type EndPointValues = (typeof END_POINT)[keyof typeof END_POINT];
