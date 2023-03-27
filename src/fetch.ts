import { FailedResponse } from './types';
import { BASE_URL } from './utils/Constant';

export const getAPIUrl = (params: string, page = 1, query = '') =>
  `${BASE_URL}3${params}?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${page}&query=${query}`;

export const fetchMovies = async (params: string, page = 1, query = '') => {
  const API_URL = getAPIUrl(params, page, query);

  const res = await fetch(API_URL);
  if (!res.ok) {
    const error: FailedResponse = await res.json();
    throw new Error(error.status_message);
  }
  const data = await res.json();
  return { movies: data.results, total_pages: data.total_pages };
};

export const getGenreAPIUrl = () =>
  `${BASE_URL}3/genre/movie/list?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR`;

export const fetchGenre = async () => {
  const API_URL = getGenreAPIUrl();
  const res = await fetch(API_URL);
  if (!res.ok) {
    const error: FailedResponse = await res.json();
    throw new Error(error.status_message);
  }
  const data = await res.json();
  return data.genres;
};
