import { MovieResponseType, MovieType } from '../type';

export const convertMovieData = (raw: MovieResponseType): MovieType => {
  return {
    backdropPath: raw.backdropPath,
    id: raw.id,
    posterPath: raw.posterPath,
    title: raw.title,
    voteAverage: raw.voteAverage,
    voteCount: raw.voteCount
  };
};
