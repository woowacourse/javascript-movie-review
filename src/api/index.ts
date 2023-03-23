import { TMDBResponse } from '../types/tmdb';

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export interface PopularParams {
  page: number;
}
export const getPopularMovies = async (params: PopularParams): Promise<TMDBResponse> => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${params.page}`
  );

  return response.json();
};

export interface SearchParams {
  query: string;
  page: number;
}
export const getSearchMovies = async (params: SearchParams): Promise<TMDBResponse> => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${params.query}&page=${params.page}`
  );

  return response.json();
};
