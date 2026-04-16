import type { MovieUserRating } from "./movieRating";

export interface Movie {
  id: number;
  title: string;
  rate: number;
  thumbnail_path: string | null;
  hero_path: string | null;
  userRating: MovieUserRating | null;
}

export interface MovieDetail {
  poster_path: string | null;
  title: string;
  release_year: string;
  genres: string[];
  rate: number;
  overview: string;
  userRating: MovieUserRating | null;
}
