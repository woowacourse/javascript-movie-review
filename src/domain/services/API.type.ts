import { API_URL } from './../../consts/Api';
export const BASE_URL = 'https://api.themoviedb.org/3';

export type SearchAPIParamsType = {
  query: string;
  pageNumber: number;
};

export type PopularAPIParamsType = {
  pageNumber: number;
};

export type UrlParamsType = {
  [key: string]: string | number;
};

export interface MovieItemReturnType {
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

export interface MovieAPIReturnType {
  page: number;
  results: MovieItemReturnType[];
  total_pages: number;
  total_results: number;
}
