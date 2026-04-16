export interface Rate {
  id: number;
  rate: number;
}

export interface RateRepository {
  getMovieRate(id: number): number;
  setMovieRate(id: number, rate: number): void
}