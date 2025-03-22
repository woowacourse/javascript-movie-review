import { MovieResult } from "./types";
export const store = {
  page: 1,
  totalPages: 1,
  movies: [] as MovieResult[],
  searchKeyword: "",
};
