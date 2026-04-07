import type { Movie } from "../../types/movie";

export interface FetchMoviePageDataResponse {
  currentPage: number;
  totalPages: number;
  results: Movie[];
}
