import { MovieDetailResponseType, MovieDetailType } from '../type';

export const convertMovieDetailData = (raw: MovieDetailResponseType): MovieDetailType => {
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
