import { httpStatus } from '../constants/httpStatusCode';
import { GetPopularMoviesRequest, MoviesResponse, SearchMoviesRequest } from './types';

const API_TOKEN = process.env.API_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

const handleStatusCode = (status: number) => {
  switch (status) {
    case httpStatus.BAD_REQUEST:
      return '잘못된 요청입니다.';
    case httpStatus.UNAUTHORIZED:
      return '인증되지 않은 요청입니다.';
    case httpStatus.FORBIDDEN:
      return '접근이 거부되었습니다.';
    case httpStatus.NOT_FOUND:
      return '요청한 리소스를 찾을 수 없습니다.';
    case httpStatus.INTERNAL_SERVER_ERROR:
      return '서버 내부 오류가 발생했습니다.';
    default:
      return '알 수 없는 오류가 발생했습니다.';
  }
};

const handleCatchError = (error: Error) => {
  alert(error);
};

const get = async (url: string, options?: RequestInit) => {
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
      throw new Error(`${handleStatusCode(response.status)}`);
    }

    const data = response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      handleCatchError(error);
    }
  }
};

const getPopularMovies = async ({
  page,
  region = 'KR',
  language = 'ko-KR',
}: GetPopularMoviesRequest): Promise<MoviesResponse> => {
  const params = `page=${page}&region=${region}&language=${language}`;
  const url = `${BASE_URL}/movie/popular?${params}`;

  const movies = await get(url);
  return movies;
};

const searchMovies = async ({ query, page }: SearchMoviesRequest): Promise<MoviesResponse> => {
  const params = `query=${query}&page=${page}&language=ko-KR&region=KR`;
  const url = `${BASE_URL}/search/movie?${params}`;

  const movies = await get(url);
  return movies;
};

export { getPopularMovies, searchMovies };
