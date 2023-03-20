import { MoviesResponse, Popular } from './types';

const API_TOKEN = process.env.API_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

const getPopularMovies = async ({ page }: Popular): Promise<MoviesResponse> => {
  const query = `page=${page}&region=KR&language=ko-KR`;
  const response = await fetch(`${BASE_URL}/movie/popular?${query}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const movies = await response.json();
  return movies;
};

const searchMovies = async ({
  text,
  page,
}: {
  text: string;
  page: number;
}): Promise<MoviesResponse> => {
  const query = `query=${text}&page=${page}&language=ko-KR&region=KR`;
  const response = await fetch(`${BASE_URL}/search/movie?${query}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  const movies = await response.json();
  return movies;
};

export { getPopularMovies, searchMovies };
