import { Movie } from '../../domain/movie.type';

export type PaginatedParams<T = object> = {
  page: number;
} & T;

export type MoviesResponse = {
  movies: Movie[];
  page: number;
  totalPages: number;
  totalMovies: number;
};

export type MoviesErrorResponse = {
  message: string;
};

export interface MoviesAPI {
  getPopularMovies(params: PaginatedParams): Promise<MoviesResponse>;

  searchMovies(params: PaginatedParams<{ query: string }>): Promise<MoviesResponse>;
}
