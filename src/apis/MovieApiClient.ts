import { MovieDetailResponse, MoviesResponse } from '@/lib/types';
import ApiClient from './ApiClient';

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
  static #ORIGIN = 'https://api.themoviedb.org';
  static #OPTIONS = {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` },
  };

  static getAll({ page }: GetAllRequest) {
    const url = new URL('/3/movie/popular', this.#ORIGIN);
    url.searchParams.append('page', String(page));
    url.searchParams.append('language', 'ko-KR');

    return ApiClient.get<MoviesResponse>(url, this.#OPTIONS);
  }

  static get({ page, query }: GetRequest) {
    const url = new URL('/3/search/movie', this.#ORIGIN);
    url.searchParams.append('page', String(page));
    url.searchParams.append('language', 'ko-KR');
    url.searchParams.append('query', query);

    return ApiClient.get<MoviesResponse>(url, this.#OPTIONS);
  }

  static getDetail({ id }: GetDetailRequest) {
    const url = new URL(`/3/movie/${id}`, this.#ORIGIN);
    url.searchParams.append('language', 'ko-KR');

    return ApiClient.get<MovieDetailResponse>(url, this.#OPTIONS);
  }
}
