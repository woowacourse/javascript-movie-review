export interface ResponseType {
  page: number;
  results: MoveType[];
  totalPages: number;
  totalResults: number;
}

export interface MoveResponseType {
  adult: boolean;
  backdropPath: null;
  genreIds: number[];
  id: number;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: Date;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}
export interface MoveDetailResponseType {
  adult: false;
  backdropPath: string;
  belongsToCollection: null;
  budget: number;
  genres: genresType[];
  homepage: string;
  id: number;
  imdbId: string;
  originCountry: string[];
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  productionCompanies: [];
  productionCountries: [];
  releaseDate: string;
  revenue: number;
  runtime: number;
  spokenLanguages: string[];
  status: string;
  tagline: string;
  title: string;
  video: false;
  voteAverage: number;
  voteCount: number;
}

export interface MovePramsType {
  language: string;
  page?: string;
  include_adult?: string;
  query?: string;
}

export interface MoveType {
  backdropPath: null;
  id: number;
  posterPath: string;
  title: string;
  voteAverage: number;
  voteCount: number;
}

export interface MoveDetailType {
  id: number;
  posterPath: string;
  title: string;
  voteAverage: number;
  overview: string;
  genres: genresType[];
  releaseDate: string;
}

interface genresType {
  id: number;
  name: string;
}
