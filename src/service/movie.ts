import { GetPopularMoviesRequest, MoviesResponse, SearchMoviesRequest } from './types';

const API_TOKEN = process.env.API_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

const getPopularMovies = async ({
  page,
  region = 'KR',
  language = 'ko-KR',
}: GetPopularMoviesRequest): Promise<MoviesResponse> => {
  const params = `page=${page}&region=${region}&language=${language}`;
  const response = await fetch(`${BASE_URL}/movie/popular?${params}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const movies = await response.json();
  return movies;
};

const searchMovies = async ({ query, page }: SearchMoviesRequest): Promise<MoviesResponse> => {
  const params = `query=${query}&page=${page}&language=ko-KR&region=KR`;
  const response = await fetch(`${BASE_URL}/search/movie?${params}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  const movies = await response.json();
  return movies;
};

export { getPopularMovies, searchMovies };
