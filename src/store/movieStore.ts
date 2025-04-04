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
  Object.assign(state, updates);
};
