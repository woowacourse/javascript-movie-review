import { MovieResult } from "../../types/movieApiType";
export const movieStore = {
  page: 1,
  totalPages: 1,
  movies: [] as MovieResult[],
  searchKeyword: "",
};
