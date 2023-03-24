export type MovieApiType = {
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
};

export type MovieListApiType = {
  page: number;
  results: MovieApiType[];
  total_pages: number;
  total_results: number;
};

type MovieType = {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
};

export type MovieListType = MovieType[];

type MovieDetailGenre = {
  id: number;
  name: string;
};

type ProductionCompaniesType = {
  name: string;
  id: string;
  logo: string | null;
  origin_country: string;
};

type ProductionCountriesType = {
  iso_3166_1: string;
  name: string;
};

type SpokenLanguages = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type MovieDetailApiType = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | object;
  budget: number;
  genres: MovieDetailGenre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompaniesType[];
  production_countries: ProductionCountriesType[];
  release_date: Date;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieDetailType = {
  title: string;
  voteAverage: number;
  poster_path: string | null;
  overview: string | null;
  genres: MovieDetailGenre[];
};
