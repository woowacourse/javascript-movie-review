import { MovieAPI } from '../domain/services/API.type';
import { Movie } from '../types/movie';

export const formatMovieList = (result: MovieAPI): Movie[] => {
  const formattedMovieList = result.results.map(movie => ({
    id: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    voteAverage: movie.vote_average,
  }));

  return formattedMovieList;
};
