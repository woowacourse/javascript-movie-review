import { MovieResponseType, MovieType } from '../type';

export const convertMovieData = (raw: MovieResponseType): MovieType => {
  return {
    backdropPath: raw.backdrop_path,
    id: raw.id,
    posterPath: raw.poster_path,
    title: raw.title,
    voteAverage: raw.vote_average,
    voteCount: raw.vote_count
  };
};
