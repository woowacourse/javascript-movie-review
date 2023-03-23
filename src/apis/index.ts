import { GetPopularMoviesRes } from '../types/api';

const REDIRECT_SERVER_HOST = 'https://ornate-swan-ce5a5e.netlify.app';

const fetchQuery = async (path: string, init?: RequestInit) => {
  const url = new URL(path, REDIRECT_SERVER_HOST);

  const response = await fetch(url, init);
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.error.message);
  }

  return body;
};

export const fetchMoviesByKeyword = (keyword: string, page?: number) => {
  return fetchQuery(`tmdb/search/movie?query=${keyword}&${page ? `page=${page}` : ''}&language=ko`);
};

export const fetchPopularMovies = (page: number = 1): Promise<GetPopularMoviesRes> => {
  return fetchQuery(`tmdb/movie/popular?page=${page}&language=ko`);
};

export const waitFor = async <T>(promise: Promise<T>): Promise<[T, null] | [undefined, Error]> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    return [undefined, new Error(JSON.stringify(err))];
  }
};
