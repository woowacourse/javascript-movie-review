import { MovieListCategory } from '.';

export interface IMovieProps {
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

export interface IMovieItemProps {
  id: number;
  title: string;
  posterPath?: string;
  voteAverage?: number;
}

export interface IMovieHandleProps<T> {
  page: number;
  results: Array<T>;
  total_pages: number;
}

export interface IMovieState {
  results: Array<IMovieItemProps>;
  nextPage: number;
  query: string;
  category: MovieListCategory;
  error: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IMovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: any;
  production_companies: IProductionCompany[];
  production_countries: IProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface IProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface ISpokenLanguage {
  iso_639_1: string;
  name: string;
}

export interface IMovieDetailItem {
  title: string;
  overview: string | null;
  voteAverage: number;
  movieId: number;
  genres: Array<string>;
  posterPath: string | null;
  myStarScore?: number;
}
