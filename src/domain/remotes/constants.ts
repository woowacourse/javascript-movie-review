export const API_KEY = process.env.API_KEY;

export const BASE_URL = 'https://api.themoviedb.org/3/';

export const QUERY_PARAMS = {
  api_key: API_KEY ?? '',
  language: 'ko-KR',
} as const;
