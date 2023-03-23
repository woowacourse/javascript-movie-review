import { MakeOptional } from '../types/common';
import { handleStatusCode } from '../validation/errorHandler';
import { CustomError } from '../validation/errors';

const REDIRECT_SERVER_HOST = 'https://ornate-swan-ce5a5e.netlify.app';

interface CommonMoviesResult {
  page: number;
  total_pages: number;
  total_results: number;
}
export interface GetPopularMoviesRes extends CommonMoviesResult {
  results: MovieInfo[];
}

export interface MovieInfo {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GetMoviesByKeywordRes extends CommonMoviesResult {
  results: MovieInfoByKeyword[];
}

export type MovieInfoByKeyword = MakeOptional<MovieInfo, 'backdrop_path' | 'poster_path'>;

const fetchQuery = async (path: string, init?: RequestInit) => {
  const url = new URL(path, REDIRECT_SERVER_HOST);

  const response = await fetch(url, init);
  const body = await response.json();

  if (!response.ok) throw handleStatusCode(response.status);

  return body;
};

export const fetchMoviesByKeyword = (keyword: string, page?: number): Promise<GetMoviesByKeywordRes> => {
  return fetchQuery(`tmdb/search/movie?query=${keyword}&${page ? `page=${page}` : ''}&language=ko`);
};

export const fetchPopularMovies = (page: number = 1): Promise<GetPopularMoviesRes> => {
  return fetchQuery(`tmdb/movie/popular?page=${page}&language=ko`);
};

export const waitFor = async <T>(promise: Promise<T>): Promise<[T, null] | [undefined, Error]> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [undefined, new CustomError({ code: error })];
  }
};
