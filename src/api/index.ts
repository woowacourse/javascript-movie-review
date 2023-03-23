import { GenresResponse, MoviesResponse } from '../types/tmdb';

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getGenres = async (): Promise<GenresResponse> => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ko-KR);`);

  return response.json();
};

export interface PopularParams {
  page: number;
}
export const getPopularMovies = async (params: PopularParams): Promise<MoviesResponse> => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${params.page}`
  );

  return response.json();
};

export interface SearchParams {
  query: string;
  page: number;
}
export const getSearchMovies = async (params: SearchParams): Promise<MoviesResponse> => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${params.query}&page=${params.page}`
  );

  return response.json();
};
