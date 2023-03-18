import { MovieListCategory } from '.';

export interface IMovieProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieItemProps {
  title: string;
  posterPath: string;
  voteAverage: number;
}

export interface IMovieHandleProps<T> {
  page: number;
  results: Array<T>;
  total_pages: number;
}

export interface IErrorMessageProps {
  isError: boolean;
  message: string;
}

export interface IMovieState {
  results: Array<IMovieItemProps | { title: null }>;
  nextPage: number;
  query: string;
  category: MovieListCategory;
  error: IErrorMessageProps;
}
