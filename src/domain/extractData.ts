import { MovieData, MovieDetailsData } from "../../types/data.ts";
import { Movie, MovieDetails } from "../../types/domain.ts";
import { IMAGE, VOTE } from "../constants/movie.ts";

export const extractMovie = (movieData: MovieData): Movie => {
  const { id, backdrop_path, poster_path, title, vote_average } = movieData;

  const backdropPath = IMAGE.backdropPrefix + backdrop_path;
  const posterPath = IMAGE.prefix + poster_path;
  const voteAverage = Number(vote_average.toFixed(VOTE.rateDegit));

  return {
    id,
    backdropPath,
    posterPath,
    title,
    voteAverage,
  };
};

export const extractMovieDetails = (
  movieDetailsData: MovieDetailsData
): MovieDetails => {
  const {
    genres,
    id,
    overview,
    poster_path,
    release_date,
    title,
    vote_average,
  } = movieDetailsData;

  const genreNames = genres.map(({ name }) => name);
  const posterPath = IMAGE.prefix + poster_path;
  const releaseYear = new Date(release_date).getFullYear();
  const voteAverage = Number(vote_average.toFixed(VOTE.rateDegit));

  return {
    genres: genreNames,
    id,
    overview,
    posterPath,
    releaseYear,
    title,
    voteAverage,
  };
};
