import { TMDBMovie } from "../api/types";
import { TMDB_IMAGE_BASE_URL } from "../api/constants";
import { MovieItem } from "../domains/movie/MovieList";

const TMDB_IMAGE_SIZE = "w500";

export const toMovieItem = (movie: TMDBMovie): MovieItem => ({
  title: movie.title,
  posterSrc: `${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE}${movie.poster_path}`,
  rating: movie.vote_average,
});
