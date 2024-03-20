const API_KEY: string = process.env.API_KEY as string;
const AUTH_KEY: string = process.env.AUTHORIZATION_KEY as string;
const BASE_URL: string = 'https://api.themoviedb.org/3';

export const REQUEST_URL = {
  popularMovies: `${BASE_URL}/movie/popular?`,
  searchMovies: `${BASE_URL}/search/movie?`,
};

export const COMMON_PARAMS = {
  api_key: API_KEY,
  language: 'ko-KR',
};

export const COMMON_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${AUTH_KEY}`,
  },
};
