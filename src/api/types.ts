export interface PopularMoviesParams {
  language: string;
  page: number;
}

export interface SearchMoviesParams {
  query: string;
  include_adult: boolean;
  language: string;
  page: number;
}

type AppendToResponse =
  | "videos"
  | "images"
  | "credits"
  | "keywords"
  | "recommendations"
  | "similar"
  | "reviews"
  | "release_dates";

export interface MovieDetailParams {
  language: string;
  append_to_response?: AppendToResponse;
}

export interface TMDBMovie {
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

export interface TMDBMovieListResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBMovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: TMDBGenre[];
  runtime: number;
  tagline: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  posterSrc: string;
  releaseYear: string;
  rating: number;
  genres: string;
  runtime: number;
  tagline: string;
}
