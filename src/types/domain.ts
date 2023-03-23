import type { MoviesResponseResult } from './tmdb';

export interface Movie {
  id: MoviesResponseResult['id'];
  title: MoviesResponseResult['title'];
  posterPath: MoviesResponseResult['poster_path'];
  voteAverage: MoviesResponseResult['vote_average'];
  genreString: string;
  overview: MoviesResponseResult['overview'];
}
