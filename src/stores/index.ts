import { MovieResult } from "../api/types/movie/response";

export const store = {
  page: 1,
  totalPages: 1,
  movies: [] as MovieResult[],
  searchKeyword: "",
};
