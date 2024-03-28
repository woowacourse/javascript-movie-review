export type SearchAPIParamsType = {
  query: string;
  pageNumber: number;
};

export type PopularAPIParamsType = {
  pageNumber: number;
};

export type UrlParamsType = {
  [key: string]: string | number;
};

export interface MovieItemReturnType {
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

export interface MovieAPIReturnType {
  page: number;
  results: MovieItemReturnType[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetailAPIReturnType {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: GenreType[];
}

export interface GenreType {
  id: number;
  name: string;
}

export interface MovieDetailAPIReturnType {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
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
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logoPath: string | null;
  name: string;
  originCountry: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  englishName: string;
  iso_639_1: string;
  name: string;
}
