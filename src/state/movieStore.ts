import { MovieSummary } from "../../types/movieApiType";

export const movieStore = {
  page: 1,
  totalPages: 1,
  movies: [] as MovieSummary[],
  searchKeyword: "",
  selectedMovie: 0,
};
