import { BASE_URL } from '../constants';
import { getErrorMessage } from '../constants/message';
import type { MovieAPISuccess } from '../types/movie';

const getPopularMovies = async (page: number = 1) => {
  const response = await fetch(`${BASE_URL}movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${page}`);

  if (response.ok) {
    const data: MovieAPISuccess = await response.json();
    return data;
  }

  throw getErrorMessage(response.status);
};

export default getPopularMovies;
