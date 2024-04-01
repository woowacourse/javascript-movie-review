import { MovieDataType } from './apiType';
import { catchError } from './errorStatus';
import { wrappingMovieAPI } from './wrappingAPI';

import { CONSTANT_URL, URL_LANGUAGE } from '../constant/api';

export const getPopularMovieList = async (page = 1): Promise<MovieDataType[]> => {
  const url = `${CONSTANT_URL.popularMovie}?${URL_LANGUAGE}&page=${page}`;
  const movieData = await catchError(url);

  const dataCleaning = movieData.results.map((movieData: MovieDataType) => {
    return wrappingMovieAPI(movieData);
  });

  return dataCleaning;
};
