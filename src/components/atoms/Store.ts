import { MovieDetailType, MovieListType } from '../../type/movie';

export type StateType = {
  movies: MovieListType;
  popularPage: number;
  searchPage: number;
  isSearched: boolean;
  isEnd: boolean;
  query: string;
  isLoading: boolean;
  movieDetail: MovieDetailType | null;
  star: number;
};

export const state: StateType = {
  movies: [],
  popularPage: 1,
  searchPage: 1,
  isSearched: false,
  isEnd: false,
  query: '',
  isLoading: true,
  movieDetail: null,
  star: 0,
};
