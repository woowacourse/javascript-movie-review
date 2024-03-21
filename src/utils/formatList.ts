import { MovieAPIReturnType } from '../domain/services/API.type';

export const formatMovieList = (result: MovieAPIReturnType) => {
  const formattedMovieList = result.results.map(movie => ({
    id: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    voteAverage: movie.vote_average,
  }));

  return formattedMovieList;
};
