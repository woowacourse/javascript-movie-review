import { MoviesResponse } from './movies';
import { MovieDetailResponse } from './movieDetail';

import { getErrorMessageByStatusCode } from '../utils/errorHandler';

type ValidResponse = MoviesResponse | MovieDetailResponse;
type Request = <T extends ValidResponse>(path: string) => Promise<T>;

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3/';

const params = {
  api_key: API_KEY ?? '',
  language: 'ko-KR',
};

export const request: Request = async (path) => {
  const url = new URL(path, BASE_URL);
  url.search = createSearchParams(url, params);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(getErrorMessageByStatusCode(response.status));
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

const createSearchParams = (url: URL, params: Record<string, string>) => {
  return new URLSearchParams({
    ...Object.fromEntries(url.searchParams),
    ...params,
  }).toString();
};
