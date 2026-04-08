import { URL, PATH } from './constant.ts';
import TMDBError from './TMDBError.ts';
import { ResponseMovie, Request, TmdbErrorType, MovieDetail } from './types.ts';

const API_KEY = import.meta.env.VITE_API_KEY;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const fetchAPI = async <T extends ResponseMovie | MovieDetail>(req: Request): Promise<T> => {
  const url = URL.BASE + req.path;

  const { query, page } = req.params;
  const params = new URLSearchParams({ language: 'ko-KR', region: 'kr' });
  if (query) params.set('query', query);
  if (page) params.set('page', String(page));
  const resultUrl = url + '?' + params.toString();
  console.log(resultUrl);

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

export const fetchMovieDetails = (movie_id: number): Promise<MovieDetail> => {
  return fetchAPI({
    path: PATH.MOVIE_DETAIL(movie_id),
    params: {},
  });
};
