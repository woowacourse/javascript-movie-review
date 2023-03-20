import { BASE_URL } from '../constants';
import { ERROR_MESSAGE } from '../constants/index';
import type { MovieAPIResponse } from '../types/movie';

const getPopularMovies = async (page: number = 1) => {
  const response = await fetch(`${BASE_URL}movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${page}`);

  if (response.ok) {
    const data: MovieAPIResponse = await response?.json();
    return data;
  } else {
    throw new Error(ERROR_MESSAGE.DATA_LOAD);
  }
};

export default getPopularMovies;
