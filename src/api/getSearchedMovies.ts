import { BASE_URL } from '../constants';
import type { MovieAPIResponse } from '../types/movie';
import { ERROR_MESSAGE } from '../constants';

const getSearchedMovies = async (query: string, page: number = 1) => {
  const response = await fetch(`${BASE_URL}search/movie?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&query=${query}&page=${page}`);

  if (response.ok) {
    const data: MovieAPIResponse = await response.json();
    return data;
  } else {
    throw new Error(ERROR_MESSAGE.DATA_LOAD);
  }
};

export default getSearchedMovies;
