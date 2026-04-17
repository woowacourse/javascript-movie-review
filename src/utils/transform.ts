import { TMDBMovie, TMDBMovieDetail, MovieDetail } from "../api/types";
import { TMDB_IMAGE_BASE_URL } from "../api/constants";
import { MovieItem } from "../services/movie/MovieListService";

const TMDB_IMAGE_SIZE = "w500";

const toPosterSrc = (posterPath: string | null): string | null =>
  posterPath ? `${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE}${posterPath}` : null;

export const toMovieItem = (movie: TMDBMovie): MovieItem => ({
  id: movie.id,
  title: movie.title,
  posterSrc: toPosterSrc(movie.poster_path),
  rating: Math.round(movie.vote_average * 10) / 10,
});

export const toMovieDetail = (movie: TMDBMovieDetail): MovieDetail => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview,
  posterSrc: toPosterSrc(movie.poster_path),
  releaseYear: movie.release_date?.slice(0, 4) ?? "Unknown",
  rating: Math.round(movie.vote_average * 10) / 10,
  genres: movie.genres.map((g) => g.name).join(", "),
  runtime: movie.runtime,
  tagline: movie.tagline,
});
