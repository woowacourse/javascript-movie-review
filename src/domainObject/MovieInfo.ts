/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
import { ResponseMovieItem } from '../types/ResponseMovieItem';
import { ResponseMovieDetail } from '../types/ResponseMovieDetail';

export interface IMovieInfo {
  id: number;
  title: string;
  poster: string;
  voteAverage: number;
}

export interface IMovieDetail {
  id: number;
  title: string;
  poster: string;
  voteAverage: number;
  genres: string[];
  overview: string;
  backdropImage: string;
}

const MovieInfo = {
  get(movie: ResponseMovieItem): IMovieInfo {
    const { id, title, poster_path, vote_average } = movie;
    return {
      id,
      title,
      poster: poster_path,
      voteAverage: vote_average,
    };
  },

  getDetail(movie: ResponseMovieDetail): IMovieDetail {
    const { id, title, poster_path, vote_average, genres, overview, backdrop_path } = movie;
    return {
      id,
      title,
      poster: poster_path,
      voteAverage: vote_average,
      genres: genres.map((genre) => genre.name),
      overview,
      backdropImage: backdrop_path,
    };
  },
};

export default MovieInfo;
