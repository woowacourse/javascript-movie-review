import { MovieDetailType, MovieListType } from '../../type/movie';

export type StateType = {
  movies: MovieListType;
  popularPage: number;
  searchPage: number;
  isSearched: boolean;
  isEnd: boolean;
  isLoading: boolean;
  isError: boolean;
  query: string;
  movieDetail: MovieDetailType | null;
  star: number;
};

export const state: StateType = {
  movies: [],
  popularPage: 1,
  searchPage: 1,
  isSearched: false,
  isEnd: false,
  isLoading: true,
  isError: false,
  query: '',
  movieDetail: null,
  star: 0,
};
