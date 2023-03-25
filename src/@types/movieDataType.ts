export interface MovieInfo {
  title: string;
  poster_path: string;
  vote_average: number;
}

export interface TotalMovieInfo {
  audult: boolean;
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

export interface genres {
  id: number;
  name: string;
}

export interface DetailInfo extends MovieInfo {
  id: number;
  genres: genres[];
  overview: string;
}

export enum CurrentTab {
  POPULAR = "popular",
  SEARCH = "search",
}

export interface ResponseInfo {
  page: number;
  results: TotalMovieInfo[];
  total_pages: number;
  total_results: number;
}

export interface ErrorType {
  [key: number]: string;
}

export interface ScoreComment {
  [key: string]: string;
}
