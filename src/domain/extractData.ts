import {
  MovieData,
  MovieDetailsData,
  TotalData,
  UserMovieRateData,
} from "../../types/data.ts";
import { Movie, MovieDetails, TotalMovies } from "../../types/domain.ts";
import { DETAILS, IMAGE, VOTE } from "../constants/movie.ts";
import { getMovieRate } from "./ratingMovie.ts";

export const extractTotalMovies = (totalData: TotalData): TotalMovies => {
  const { results, total_pages, total_results } = totalData;
  const movies = results.map((movieData) => extractMovie(movieData));

  return {
    results: movies,
    totalPages: total_pages,
    totalResults: total_results,
  };
};

const extractMovie = (movieData: MovieData): Movie => {
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
  movieDetailsData: MovieDetailsData,
  movieRate: UserMovieRateData
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
  const formattedOverview =
    overview === "" ? DETAILS.defaultOverview : overview;
  const posterPath = IMAGE.prefix + poster_path;
  const releaseYear = new Date(release_date).getFullYear();
  const voteAverage = Number(vote_average.toFixed(VOTE.rateDegit));
  const rate = getMovieRate(movieRate);

  return {
    genres: genreNames,
    id,
    overview: formattedOverview,
    posterPath,
    releaseYear,
    title,
    voteAverage,
    rate,
  };
};
