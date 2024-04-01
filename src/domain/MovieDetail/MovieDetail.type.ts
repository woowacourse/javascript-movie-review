import { MovieInterface, MovieResponse } from '../Movie/Movie.type';

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetailResponse extends MovieResponse {
  genres: Genre[];
  overview: string;
}

export interface MovieDetailInterface extends MovieInterface {
  genres: string;
  overview: string;
}

export interface RateDetail {
  title?: string;
  ratingScore?: number;
}
