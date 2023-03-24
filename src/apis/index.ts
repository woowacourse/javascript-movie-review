import { MovieChart } from '../domain/MovieChart';
import { handleStatusCode } from '../validation/errorHandler';
import { CustomError } from '../validation/errors';

const REDIRECT_SERVER_HOST = 'https://ornate-swan-ce5a5e.netlify.app';

const fetchQuery = async (path: string, init?: RequestInit) => {
  const url = new URL(path, REDIRECT_SERVER_HOST);

  const response = await fetch(url, init);
  const body = await response.json();

  if (!response.ok) throw handleStatusCode(response.status);

  return body;
};

export const fetchMoviesByKeyword = (keyword: string, page?: number): Promise<MovieChart> => {
  return fetchQuery(`tmdb/search/movie?query=${keyword}&${page ? `page=${page}` : ''}&language=ko`).then(
    (movieChart) => new MovieChart(movieChart)
  );
};

export const fetchPopularMovies = (page: number = 1): Promise<MovieChart> => {
  return fetchQuery(`tmdb/movie/popular?page=${page}&language=ko`).then((movieChart) => new MovieChart(movieChart));
};

export const waitFor = async <T>(promise: Promise<T>): Promise<[T, null] | [undefined, Error]> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [undefined, new CustomError({ code: error })];
  }
};
