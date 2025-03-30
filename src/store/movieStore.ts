import { Movie } from "../../types/movie.ts";

type MovieState = {
  list: Movie[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  query: string;
};

const state: MovieState = {
  list: [],
  currentPage: 1,
  totalPages: 0,
  isLoading: false,
  query: "",
};

export const getState = () => state;

export const updateState = (updates: Partial<MovieState>) => {
  if (updates.list !== undefined) state.list = updates.list;
  if (updates.currentPage !== undefined) state.currentPage = updates.currentPage;
  if (updates.totalPages !== undefined) state.totalPages = updates.totalPages;
  if (updates.isLoading !== undefined) state.isLoading = updates.isLoading;
  if (updates.query !== undefined) state.query = updates.query;
};
