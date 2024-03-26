export const BASE_URL = 'https://api.themoviedb.org/3';

export type SearchAPIParams = {
  query: string;
  pageNumber: number;
};

export type PopularAPIParams = {
  pageNumber: number;
};

export interface MovieItem {
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

export interface MovieAPI {
  page: number;
  results: MovieItem[];
  total_pages: number;
  total_results: number;
}
