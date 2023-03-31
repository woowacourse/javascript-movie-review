import { ErrorResponse, GetMovieDetailResponse, GetRequest } from './types';
import { GetMovieDetailRequest } from './types';
import { GetPopularMoviesRequest, MoviesResponse, SearchMoviesRequest } from './types';

const API_TOKEN = process.env.API_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

const get = async ({ url, options, onError = alert }: GetRequest) => {
  try {
    if (!navigator.onLine) throw new Error('인터넷 연결 문제입니다. 네트워크를 확인해주세요.');
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      ...options,
    });

    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      throw new Error(`${response.status} ${errorResponse.status_message}`);
    }

    const data = response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      onError(error);
    }
  }
};

const getPopularMovies = async ({
  page,
  region = 'KR',
  language = 'ko-KR',
  onError,
}: GetPopularMoviesRequest): Promise<MoviesResponse> => {
  const params = `page=${page}&region=${region}&language=${language}`;
  const url = `${BASE_URL}/movie/popular?${params}`;

  const movies = await get({ url, onError });
  return movies;
};

const searchMovies = async ({
  query,
  page,
  onError,
}: SearchMoviesRequest): Promise<MoviesResponse> => {
  const params = `query=${query}&page=${page}&language=ko-KR&region=KR`;
  const url = `${BASE_URL}/search/movie?${params}`;

  const movies = await get({ url, onError });
  return movies;
};
const getMovieDetail = async ({
  movie_id,
  onError,
}: GetMovieDetailRequest): Promise<GetMovieDetailResponse> => {
  const params = `language=ko-KR`;
  const url = `${BASE_URL}/movie/${movie_id}?${params}`;

  const movieDetail = await get({ url, onError });
  return movieDetail;
};

export { getPopularMovies, searchMovies, getMovieDetail };
