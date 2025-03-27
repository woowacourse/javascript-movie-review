import { MoveResponseType, MoveType } from '../type';

export const convertMovieData = (raw: MoveResponseType): MoveType => {
  return {
    backdropPath: raw.backdropPath,
    id: raw.id,
    posterPath: raw.posterPath,
    title: raw.title,
    voteAverage: raw.voteAverage,
    voteCount: raw.voteCount
  };
};
