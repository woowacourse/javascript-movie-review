import type { AppMovie, RawMovie } from '../types/movie';

export const convertToAppMovies = (movies: RawMovie[]): AppMovie[] =>
  movies.map(({ id, title, poster_path, vote_average }) => ({ id, title, posterPath: poster_path, rating: vote_average }));
