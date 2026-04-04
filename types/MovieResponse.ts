import type { Movie } from "./Movie.ts";

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}
