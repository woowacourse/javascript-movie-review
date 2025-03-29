export interface State {
  readonly totalMovies: number;
}

export interface TotalMovies {
  readonly results: Movie[];
  readonly totalPages: number;
  readonly totalResults: number;
}

export interface Movie {
  readonly id: number;
  readonly backdropPath: string;
  readonly posterPath: string;
  readonly title: string;
  readonly voteAverage: number;
}

export interface MovieDetails {
  readonly genres: string[];
  readonly id: number;
  readonly overview: string;
  readonly posterPath: string;
  readonly releaseYear: number;
  readonly title: string;
  readonly voteAverage: number;
  rate: number;
}
