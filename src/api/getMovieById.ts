import { BASE_URL } from '../constants';
import { ERROR_MESSAGE } from '../constants/index';
import type { MovieAPIResponse } from '../types/movie';

const getMovieById = async (id: string) => {
  const response = await fetch(`${BASE_URL}movie/${id}?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR`);

  if (response.ok) {
    const data = await response?.json();
    return data;
  } else {
    throw new Error(ERROR_MESSAGE.DATA_LOAD);
  }
};

export default getMovieById;
