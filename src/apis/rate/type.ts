export interface GetMovieRateParameter {
  movieId: number;
}

export interface CreateMovieRateParameter {
  movieId: number;
  rate: number;
}

export interface UpdateMovieRateParameter extends CreateMovieRateParameter {}

export interface Rate {
  rate: number | null;
}
