import { BASE_URL } from '../constants';
import type { MovieAPIResponse } from '../types/movie';

const getSearchedMovies = async (query: string, page: number = 1) => {
  const response = await fetch(`${BASE_URL}search/movie?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&query=${query}&page=${page}`);
  const data: MovieAPIResponse = await response.json();

  return data;
};

export default getSearchedMovies;
