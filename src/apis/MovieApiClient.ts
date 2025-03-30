import { MovieDetailResponse, MoviesResponse } from '@/types';
import ApiClient from './ApiClient';
import { TMDB_ORIGIN } from '@/constants';

interface GetAllRequest {
  page: number;
}

interface GetRequest {
  page: number;
  query: string;
}

interface GetDetailRequest {
  id: number;
}

export default class MovieApiClient {
  static #OPTIONS = {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` },
  };

  static getAll({ page }: GetAllRequest) {
    const url = new URL('/3/movie/popular', TMDB_ORIGIN);
    url.searchParams.append('page', String(page));
    url.searchParams.append('language', navigator.language);

    return ApiClient.get<MoviesResponse>(url, this.#OPTIONS);
  }

  static get({ page, query }: GetRequest) {
    const url = new URL('/3/search/movie', TMDB_ORIGIN);
    url.searchParams.append('page', String(page));
    url.searchParams.append('language', navigator.language);
    url.searchParams.append('query', query);

    return ApiClient.get<MoviesResponse>(url, this.#OPTIONS);
  }

  static getDetail({ id }: GetDetailRequest) {
    const url = new URL(`/3/movie/${id}`, TMDB_ORIGIN);
    url.searchParams.append('language', navigator.language);

    return ApiClient.get<MovieDetailResponse>(url, this.#OPTIONS);
  }
}
