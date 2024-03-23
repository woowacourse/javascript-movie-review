/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
import { ResponseMovieItem } from '../types/ResponseMovieItem';

export interface IMovieInfo {
  id: number;
  title: string;
  poster: string;
  voteAverage: number;
  genreIds: number[];

  backdropImage: string;
  overview: string;
}

const MovieInfo = {
  get(movie: ResponseMovieItem): IMovieInfo {
    const { id, title, poster_path, vote_average, genre_ids, backdrop_path, overview } = movie;
    return {
      id,
      title,
      poster: poster_path,
      voteAverage: vote_average,
      genreIds: genre_ids,
      backdropImage: backdrop_path,
      overview,
    };
  },
};

export default MovieInfo;
