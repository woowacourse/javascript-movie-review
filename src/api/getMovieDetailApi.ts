import { BASE_URL } from '../constants';
import { getErrorMessage } from '../constants/message';
import type { MovieDetailAPIResponse } from '../types/movieDetail';

const getMovieDetailApi = async (movieId: string) => {
  const response = await fetch(`${BASE_URL}movie/${movieId}?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR`);

  if (response.ok) {
    const data: MovieDetailAPIResponse = await response.json();
    return data;
  }

  throw getErrorMessage(response.status);
};

export default getMovieDetailApi;
