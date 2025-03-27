export interface ResponseType {
  page: number;
  results: MoveType[];
  totalPages: number;
  totalResults: number;
}

export interface MoveType {
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
