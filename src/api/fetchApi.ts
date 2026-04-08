import { URL, PATH } from './constant.ts';
import TMDBError from './TMDBError.ts';
import { ResponseMovie, Request, TmdbErrorType } from './types.ts';

const API_KEY = import.meta.env.VITE_API_KEY;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const fetchAPI = async (req: Request): Promise<ResponseMovie> => {
  const url = URL.BASE + req.path;

  const { query, page } = req.params;
  const params = new URLSearchParams({ language: 'ko-KR', page: String(page), region: 'kr' });
  if (query) params.set('query', query);

  const resultUrl = url + '?' + params.toString();

  const response = await fetch(resultUrl, options);
  const data = await response.json();

  if (!response.ok) {
    throw new TMDBError(data as TmdbErrorType);
  }

  return data;
};

export const fetchSearchMovies = (query: string, page: number = 1): Promise<ResponseMovie> => {
  return fetchAPI({
    path: PATH.SEARCH_MOVIE,
    params: { query, page },
  });
};

export const fetchPopularMovies = (page: number = 1): Promise<ResponseMovie> => {
  return fetchAPI({
    path: PATH.MOVIE_POPULAR,
    params: { page },
  });
};
