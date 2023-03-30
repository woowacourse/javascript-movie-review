import type { MoviesResponseResult } from './tmdb';

export interface Movie {
  id: MoviesResponseResult['id'];
  title: MoviesResponseResult['title'];
  posterPath: MoviesResponseResult['poster_path'];
  voteAverage: string;
  genreString: string;
  overview: MoviesResponseResult['overview'];
}
