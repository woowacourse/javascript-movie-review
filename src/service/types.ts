interface GetRequest {
  url: string;
  options?: RequestInit;
  onError?: ErrorHandler;
}

interface GetPopularMoviesRequest extends Pick<GetRequest, 'onError'> {
  page: number;
  region?: string;
  language?: string;
}

interface SearchMoviesRequest extends Pick<GetRequest, 'onError'> {
  query: string;
  page: number;
  language?: string;
  region?: string;
  year?: number;
  primary_release_year?: number;
  include_adult?: boolean;
}

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: 'ko';
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

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface GetMovieDetailRequest extends Pick<GetRequest, 'onError'> {
  movie_id: number;
  language?: string;
  append_to_response?: string;
}

interface GetMovieDetailResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

type ErrorHandler = (error: Error) => void;

interface ErrorResponse {
  status_code: number;
  status_message: string;
  success: boolean;
}

export {
  Movie,
  MoviesResponse,
  GetRequest,
  GetPopularMoviesRequest,
  SearchMoviesRequest,
  GetMovieDetailRequest,
  GetMovieDetailResponse,
  ErrorHandler,
  ErrorResponse,
};
