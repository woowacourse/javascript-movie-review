export interface MovieResponse {
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

type ValidResponse = MovieResponse[];
type Request = <T extends ValidResponse>(path: string) => Promise<T>;

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3/';

const params = {
  api_key: API_KEY ?? '',
  language: 'ko-KR',
};

const request: Request = async (path) => {
  const url = new URL(path, BASE_URL);
  url.search = createSearchParams(url, params);
  const response = await fetch(url);

  if (!response.ok) throw new Error('API 요청 중 에러가 발생했습니다.');

  return response.json();
};

const createSearchParams = (url: URL, params: Record<string, string>) => {
  return new URLSearchParams({
    ...Object.fromEntries(url.searchParams),
    ...params,
  }).toString();
};

export const getPopularMovies = async (page: number): Promise<MovieResponse[]> => {
  return request(`movie/popular?page=${page}`);
};

export const getSearchMovies = async (query: string, page = 1): Promise<MovieResponse[]> => {
  return request(`search/movie?query=${query}&page=${page}`);
};
