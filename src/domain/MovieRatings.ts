import MovieRating, { MovieRatingProps, RatingValue } from "./MovieRating";

export default class MovieRatings {
  private ratings: MovieRating[] = [];

  constructor(ratings: MovieRating[] = []) {
    this.ratings = ratings;
  }

  public info(): MovieRatingProps[] {
    return this.ratings.map((rating) => rating.info());
  }

  public put(movieRatingProps: MovieRatingProps) {
    const { movieId, rating } = movieRatingProps;

    const updated = this.ratings.filter((r) => !r.isSameMovie(movieId));
    updated.push(new MovieRating({ movieId, rating }));

    this.ratings = updated;
  }

  public findRating(movieId: number): RatingValue | null {
    const targetRating = this.ratings.find((r) => r.isSameMovie(movieId));

    return targetRating ? targetRating.info().rating : null;
  }
}
