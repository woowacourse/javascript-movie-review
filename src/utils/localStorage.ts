export type MovieRate = 2 | 4 | 6 | 8 | 10;

export interface MovieRating {
  movieId: number;
  rating: MovieRate;
}

const MOVIE_RATINGS_KEY = "movie_ratings" as const;

export const getMovieRatings = (): MovieRating[] => {
  const ratings = localStorage.getItem(MOVIE_RATINGS_KEY);
  return ratings ? JSON.parse(ratings) : [];
};

export const getMovieRating = (movieId: number): MovieRate | null => {
  const ratings = getMovieRatings();
  const movieRating = ratings.find((rating) => rating.movieId === movieId);
  return movieRating ? movieRating.rating : null;
};

export const saveMovieRating = (movieId: number, rating: MovieRate): void => {
  const ratings = getMovieRatings();
  const existingRatingIndex = ratings.findIndex((r) => r.movieId === movieId);

  if (existingRatingIndex !== -1) {
    ratings[existingRatingIndex].rating = rating;
  } else {
    ratings.push({ movieId, rating });
  }

  localStorage.setItem(MOVIE_RATINGS_KEY, JSON.stringify(ratings));
};
