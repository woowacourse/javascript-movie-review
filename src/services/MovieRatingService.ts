import type { Movie, MovieDetail } from "../../types/movie";
import { MOVIE_USER_RATING_LABELS, MOVIE_USER_RATING_OPTIONS, type MovieUserRating } from "../../types/movieRating";

const DEFAULT_MOVIE_USER_RATING_LABEL = "별점을 남겨보세요";
//별점 유효성 검사
export const isMovieUserRating = (value: unknown): value is MovieUserRating => {
  return typeof value === "number" && MOVIE_USER_RATING_OPTIONS.some((option) => option === value);
};

export const getMovieUserRatingLabel = (userRating: MovieUserRating | null) => {
  return userRating ? MOVIE_USER_RATING_LABELS[userRating] : DEFAULT_MOVIE_USER_RATING_LABEL;
};

export const formatMovieUserRatingScore = (userRating: MovieUserRating | null) => {
  return `(${userRating ?? 0}/10)`;
};

export const applyMovieUserRating = <T extends Movie | MovieDetail>(
  movie: T,
  userRating: MovieUserRating | null,
): T => {
  return {
    ...movie,
    userRating,
  };
};

export const applyMovieUserRatings = (
  movies: Movie[],
  userRatingsByMovieId: Record<number, MovieUserRating | null>,
) => {
  return movies.map((movie) => applyMovieUserRating(movie, userRatingsByMovieId[movie.id] ?? null));
};
