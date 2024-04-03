import { MovieData } from './apiType';
import { catchError } from './errorStatus';
import { wrappingMovieAPI } from './wrappingAPI';

import { CONSTANT_URL, URL_LANGUAGE } from '../constant/api';

export const getSearchMovieList = async (query: string, page = 1): Promise<MovieData[]> => {
  const url = `${CONSTANT_URL.movieSearch}?query=${query}&${URL_LANGUAGE}&page=${page}`;

  const movieData = await catchError(url);
  const dataCleaning = movieData.results.map((movieData: MovieData) => {
    return wrappingMovieAPI(movieData);
  });

  return dataCleaning;
};
