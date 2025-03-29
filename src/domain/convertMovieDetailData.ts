import { MoveDetailResponseType, MoveDetailType } from '../type';

export const convertMovieDetailData = (raw: MoveDetailResponseType): MoveDetailType => {
  return {
    id: raw.id,
    posterPath: raw.posterPath,
    title: raw.title,
    voteAverage: raw.voteAverage,
    overview: raw.overview,
    genres: raw.genres,
    releaseDate: raw.releaseDate
  };
};
