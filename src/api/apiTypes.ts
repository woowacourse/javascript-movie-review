import type { Movie } from "../../types/movie";

export interface RequestOptions {
  method: "GET" | "POST";
  headers: {
    accept: string;
    Authorization: string;
  };
}

export interface FetchMoviePageDataResponse {
  currentPage: number;
  totalPages: number;
  results: Movie[];
}
