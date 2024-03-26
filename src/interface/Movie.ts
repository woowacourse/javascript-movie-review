export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

export type MovieAPIResponse = [Movie[], number, number];

export interface UrlParams extends URLSearchParams {
  api_key?: string;
  language: string;
  page: string;
  query?: string;
}

export interface MovieList {
  page: number;
  results: Array<MovieList>;
  total_pages: number;
  total_results: number;
}

export interface MovieData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
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
