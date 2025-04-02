export interface ResponseType<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface MovieResponseType {
  adult: boolean;
  backdrop_path: null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface MovieDetailResponseType {
  adult: false;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: GenresType[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [];
  production_countries: [];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: string[];
  status: string;
  tagline: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}

export interface MovieParamsType {
  language: string;
  page?: string;
  include_adult?: string;
  query?: string;
}

export interface MovieType {
  backdropPath: null;
  id: number;
  posterPath: string;
  title: string;
  voteAverage: number;
  voteCount: number;
}

export interface MovieDetailType {
  id: number;
  posterPath: string;
  title: string;
  voteAverage: number;
  overview: string;
  genres: GenresType[];
  releaseDate: string;
}

interface GenresType {
  id: number;
  name: string;
}

export interface RateMovieType {
  id: number;
  rate: number;
}

export type RatingScore = 0 | 2 | 4 | 6 | 8 | 10;

export interface currentRateType {
  rate: number;
  status: boolean;
}
