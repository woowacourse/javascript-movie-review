import { TMDBMovie, TMDBMovieDetail, MovieDetail } from "../api/types";
import { TMDB_IMAGE_BASE_URL } from "../api/constants";
import { MovieItem } from "../domains/movie/MovieList";

const TMDB_IMAGE_SIZE = "w500";

export const toMovieItem = (movie: TMDBMovie): MovieItem => ({
  id: movie.id,
  title: movie.title,
  posterSrc: `${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE}${movie.poster_path}`,
  rating: Math.round(movie.vote_average * 10) / 10,
});

export const toMovieDetail = (movie: TMDBMovieDetail): MovieDetail => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview,
  posterSrc: `${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE}${movie.poster_path}`,
  releaseYear: movie.release_date.slice(0, 4),
  rating: Math.round(movie.vote_average * 10) / 10,
  genres: movie.genres.map((g) => g.name).join(", "),
  runtime: movie.runtime,
  tagline: movie.tagline,
});
