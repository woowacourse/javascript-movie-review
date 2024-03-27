import { POPULAR_MOVIES_URL } from '.';
import { MovieDataType } from './apiType';
import { catchError } from './errorStatus';
import { wrappingMovieAPI } from './wrappingAPI';

export const getPopularMovieList = async (page = 1): Promise<MovieDataType[]> => {
  const url = `${POPULAR_MOVIES_URL}?language=ko-KR&page=${page}`;
  const movieData = await catchError(url);

  const dataCleaning = movieData.map((movieData: MovieDataType) => {
    return wrappingMovieAPI(movieData);
  });

  return dataCleaning;
};
