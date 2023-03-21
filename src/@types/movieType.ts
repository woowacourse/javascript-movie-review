export interface MovieInfoType {
  title: string;
  poster_path: string;
  vote_average: number;
}

export interface CoreInfoType {
  title: string;
  posterPath: string;
  voteAverage: number;
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

export type CurrentTab = "popular" | "search";

export interface ResponseInfo {
  page: number;
  results: TotalMovieInfoType[];
  total_pages: number;
  total_results: number;
}

export type ErrorType = {
  [key: number]: string;
};
