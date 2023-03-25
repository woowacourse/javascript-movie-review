import { requestUrl } from '../constants/movieApi';
import { MovieDetailRoot, MovieRoot } from '../types/movieApi';

const fetchMovieList = async (requestUrl: string): Promise<MovieRoot | MovieDetailRoot> => {
  return await (await fetch(requestUrl)).json();
};

export const getPopularMovieList = async (): Promise<MovieRoot | MovieDetailRoot> => {
  return await fetchMovieList(requestUrl.getPopularMovie(1));
};

export const searchMovieList = async (
  query: FormDataEntryValue,
  page: number
): Promise<MovieRoot | MovieDetailRoot> => {
  const url = query ? requestUrl.getSearchMovie(query, page) : requestUrl.getPopularMovie(page);

  return await fetchMovieList(url);
};

export const getMoreMovieList = async (
  query: FormDataEntryValue,
  nextPage: number
): Promise<MovieRoot | MovieDetailRoot> => {
  const url = query ? requestUrl.getSearchMovie(query, nextPage) : requestUrl.getPopularMovie(nextPage);

  return await fetchMovieList(url);
};

export const getMovieDetails = async (id: string): Promise<MovieRoot | MovieDetailRoot> => {
  return await fetchMovieList(requestUrl.getMovieDetail(id));
};
