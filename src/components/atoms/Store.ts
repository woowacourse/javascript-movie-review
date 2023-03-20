import { MovieListType } from '../../type/movie';

export type StateType = {
  movies: MovieListType;
  popularPage: number;
  searchPage: number;
  isSearched: boolean;
  isEnd: boolean;
  query: string;
  isLoading: boolean;
};

export const state = {
  movies: [],
  popularPage: 1,
  searchPage: 1,
  isSearched: false,
  isEnd: false,
  query: '',
  isLoading: true,
};
