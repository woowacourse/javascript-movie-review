export interface Movie {
  backdropPath: string;
  id: number;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  title: string;
  voteAverage: number;
}

export interface MovieDetail {
  releaseDate: string;
  title: string;
  voteAverage: number;
  backdropPath: string;
  posterPath: string;
  overview: string;
  genres: {
    id: number;
    name: string;
  }[];
  id: number;
}

export interface MovieList {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
}
