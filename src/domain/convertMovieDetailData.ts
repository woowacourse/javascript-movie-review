import { MovieDetailResponseType, MovieDetailType } from '../type';

export const convertMovieDetailData = (raw: MovieDetailResponseType): MovieDetailType => {
  return {
    id: raw.id,
    posterPath: raw.poster_path,
    title: raw.title,
    voteAverage: raw.vote_average,
    overview: raw.overview,
    genres: raw.genres,
    releaseDate: raw.release_date
  };
};
