import { ERROR_CODE } from './../constants/errors';
import { MovieChart } from '../domain/MovieChart';
import { handleStatusCode } from '../validation/errorHandler';
import { CustomError } from '../validation/errors';
import { GetMovieGenres, GetMoviesByKeywordRes, GetPopularMoviesRes } from './movieChart.type';

const REDIRECT_SERVER_HOST = 'https://ornate-swan-ce5a5e.netlify.app';

const fetchQuery = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const url = new URL(path, REDIRECT_SERVER_HOST);

  const response = await fetch(url, init);
  const body = await response.json();

  if (!response.ok) handleStatusCode(response.status);

  return body;
};

export const fetchMoviesByKeyword = (keyword: string, page?: number, options?: WaitForOptions<MovieChart>) => {
  const promise = fetchQuery<GetMoviesByKeywordRes>(
    `tmdb/search/movie?query=${keyword}&${page ? `page=${page}` : ''}&language=ko`
  ).then((movieChart) => new MovieChart(movieChart));

  return waitFor(promise, options);
};

export const fetchPopularMovies = (page: number = 1, options?: WaitForOptions<MovieChart>) => {
  const promise = fetchQuery<GetPopularMoviesRes>(`tmdb/movie/popular?page=${page}&language=kao`).then(
    (movieChart) => new MovieChart(movieChart)
  );

  return waitFor(promise, options);
};

export const fetchMovieGenres = (options?: WaitForOptions<GetMovieGenres>) => {
  const promise = fetchQuery<GetMovieGenres>(`tmdb/genre/movie/list?`);

  return waitFor(promise, options);
};

interface WaitForOptions<T> {
  onSuccess?(data: T): void;
  onError?(data: Error): void;
}

export const waitFor = async <T>(
  promise: Promise<T>,
  options?: WaitForOptions<T>
): Promise<[T, null] | [undefined, Error]> => {
  try {
    const data = await promise;
    options?.onSuccess?.(data);

    return [data, null];
  } catch (error) {
    if (error instanceof Error) {
      options?.onError?.(error);

      return [undefined, error];
    }

    throw new CustomError({ code: ERROR_CODE.UNEXPECTED_ERROR });
  }
};
