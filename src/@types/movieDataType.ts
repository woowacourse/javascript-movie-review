export interface MovieInfoType {
  title: string;
  poster_path: string;
  vote_average: number;
}

export interface TotalMovieInfoType {
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

export enum CurrentTab {
  POPULAR = "popular",
  SEARCH = "search",
}

export interface ResponseInfo {
  page: number;
  results: TotalMovieInfoType[];
  total_pages: number;
  total_results: number;
}

export interface ErrorType {
  [key: number]: string;
}

export interface ScoreComment {
  [key: string]: string;
}
