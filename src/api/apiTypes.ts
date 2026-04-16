import type { Movie } from "../../types/movie";

export interface MovieListResponse {
  currentPage: number;
  totalPages: number;
  results: Movie[];
}
