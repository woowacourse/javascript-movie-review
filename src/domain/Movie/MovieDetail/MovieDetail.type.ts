import { MovieResponse } from '../Movie.type';

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetailResponse extends MovieResponse {
  genres: Genre[];
  overview: string;
}
