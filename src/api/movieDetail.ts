import { MovieDetailData } from './apiType';
import { wrappingMovieDetailAPI } from './wrappingAPI';
import { throwError } from './errorStatus';
import { CONSTANT_URL, URL_LANGUAGE } from '../constant/api';

export const getMovieDetail = async (movieId: number): Promise<MovieDetailData> => {
  const url = `${CONSTANT_URL.movieDetail}${movieId}?${URL_LANGUAGE}`;
  const movieData = await throwError(url);

  const cleaningData = wrappingMovieDetailAPI(movieData);

  return cleaningData;
};
