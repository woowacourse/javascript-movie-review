import { BASE_URL, ERROR_MESSAGE } from '../constants';
import type { MovieAPISuccess } from '../types/movie';

const getSearchedMovies = async (query: string, page: number = 1) => {
  const response = await fetch(`${BASE_URL}search/movie?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&query=${query}&page=${page}`);

  if (response.ok) {
    const data: MovieAPISuccess = await response.json();
    return data;
  }

  throw new Error(`${ERROR_MESSAGE} - ${response.status}`);
};

export default getSearchedMovies;
