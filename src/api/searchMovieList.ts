import { MOVIE_SEARCH_URL } from '.';
import { MovieDataType } from './apiType';
import { catchError } from './errorStatus';
import { wrappingMovieAPI } from './wrappingAPI';

export const getSearchMovieList = async (query: string, page = 1): Promise<MovieDataType[]> => {
  const url = `${MOVIE_SEARCH_URL}?query=${query}&language=ko-KR&page=${page}`;

  const movieData = await catchError(url);
  const dataCleaning = movieData.map((movieData: MovieDataType) => {
    return wrappingMovieAPI(movieData);
  });

  return dataCleaning;
};
