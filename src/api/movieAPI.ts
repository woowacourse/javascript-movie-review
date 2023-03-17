import { MovieData, MovieDataResult } from '../types/movie';
import {
  API_BASE_URL,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} from '../constants';
import HTTPError from './HTTPError';

async function fetchPopularMovieData(currentPage: number): Promise<MovieDataResult[]> {
  const response = await fetch(
    `${API_BASE_URL}movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${currentPage}`
  );

  if (!response.ok) {
    if (
      response.status >= HTTP_STATUS_BAD_REQUEST &&
      response.status < HTTP_STATUS_INTERNAL_SERVER_ERROR
    ) {
      throw new HTTPError(HTTP_STATUS_BAD_REQUEST);
    } else if (response.status >= HTTP_STATUS_INTERNAL_SERVER_ERROR) {
      throw new HTTPError(HTTP_STATUS_INTERNAL_SERVER_ERROR);
    }
  }

  const movieData: MovieData = await response.json();

  return movieData.results;
}

async function fetchSearchedMovieData(
  searchKey: string,
  currentPage: number
): Promise<MovieDataResult[]> {
  const response = await fetch(
    `${API_BASE_URL}search/movie?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&query=${searchKey}&page=${currentPage}&include_adult=false`
  );

  if (!response.ok) {
    if (
      response.status >= HTTP_STATUS_BAD_REQUEST &&
      response.status < HTTP_STATUS_INTERNAL_SERVER_ERROR
    ) {
      throw new HTTPError(HTTP_STATUS_BAD_REQUEST);
    } else if (response.status >= HTTP_STATUS_INTERNAL_SERVER_ERROR) {
      throw new HTTPError(HTTP_STATUS_INTERNAL_SERVER_ERROR);
    }
  }

  const movieData: MovieData = await response.json();

  return movieData.results;
}

export { fetchPopularMovieData, fetchSearchedMovieData };
