import type { TMDBResponseResult } from './tmdb';

export interface Movie {
  title: TMDBResponseResult['title'];
  posterPath: TMDBResponseResult['poster_path'];
  voteAverage: TMDBResponseResult['vote_average'];
}
