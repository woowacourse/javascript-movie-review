import { GetPopularMoviesRequest, MoviesResponse, SearchMoviesRequest } from './types';

const API_TOKEN = process.env.API_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

const get = (url: string, options?: RequestInit) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    ...options,
  });
};

const getPopularMovies = async ({
  page,
  region = 'KR',
  language = 'ko-KR',
}: GetPopularMoviesRequest): Promise<MoviesResponse> => {
  const params = `page=${page}&region=${region}&language=${language}`;
  const url = `${BASE_URL}/movie/popular?${params}`;

  const response = await get(url);
  const movies = await response.json();
  return movies;
};

const searchMovies = async ({ query, page }: SearchMoviesRequest): Promise<MoviesResponse> => {
  const params = `query=${query}&page=${page}&language=ko-KR&region=KR`;
  const url = `${BASE_URL}/search/movie?${params}`;

  const response = await get(url);
  const movies = await response.json();
  return movies;
};

export { getPopularMovies, searchMovies };
