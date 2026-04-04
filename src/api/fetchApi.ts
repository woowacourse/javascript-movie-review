import { BASE_URL, PATH } from './constant.ts';
import { ResponseMovie, Request } from './type.ts';
const API_KEY = import.meta.env.VITE_API_KEY;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const fetchAPI = async (req: Request): Promise<ResponseMovie> => {
  const url = BASE_URL + req.path;

  const { query, page } = req.params;
  const params = new URLSearchParams({ language: 'en-US', page: String(page) });
  if (query) params.set('query', query);

  const resultUrl = url + '?' + params.toString();

  const response = await fetch(resultUrl, options);

  if (!response.ok) {
    throw new Error('영화 데이터를 불러오는 데 실패했습니다.');
  }

  const data = (await response.json()) as ResponseMovie;
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
