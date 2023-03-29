import { requestUrl } from '../constants/movieApi';
import { MovieDetailRoot, MovieRoot } from '../types/movieApi';

const fetchMovieList = async (requestUrl: string): Promise<MovieRoot | MovieDetailRoot | null> => {
  try {
    return await (await fetch(requestUrl)).json();
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getPopularMovieList = async (): Promise<MovieRoot | MovieDetailRoot | null> => {
  return fetchMovieList(requestUrl.getPopularMovie(1));
};

export const searchMovieList = async (
  query: FormDataEntryValue,
  page: number
): Promise<MovieRoot | MovieDetailRoot | null> => {
  const url = query ? requestUrl.getSearchMovie(query, page) : requestUrl.getPopularMovie(page);

  return await fetchMovieList(url);
};

export const getMoreMovieList = async (
  query: FormDataEntryValue,
  nextPage: number
): Promise<MovieRoot | MovieDetailRoot | null> => {
  const url = query ? requestUrl.getSearchMovie(query, nextPage) : requestUrl.getPopularMovie(nextPage);

  return await fetchMovieList(url);
};

export const getMovieDetails = async (id: string): Promise<MovieRoot | MovieDetailRoot | null> => {
  return await fetchMovieList(requestUrl.getMovieDetail(id));
};
