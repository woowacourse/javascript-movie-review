import type { Genre } from "./api.ts";

const State = {
  nextPageNum: 0,
  nextSearchPageNum: 0,
  requestMovieCount: 0,
  searchQuery: "",
  genres: [] as Genre[],
  isLoading: false,
  totalPages: 0,
  totalSearchPages: 0,
};

export default State;
