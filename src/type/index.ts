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

export interface MoveType {
  backdropPath: null;
  id: number;
  posterPath: string;
  title: string;
  voteAverage: number;
  voteCount: number;
}
