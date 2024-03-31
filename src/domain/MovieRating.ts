export interface MovieRatingProps {
  movieId: number;
  rating: number;
}

export type RatingValue = 2 | 4 | 6 | 8 | 10;

const RATING_VALUES = [2, 4, 6, 8, 10];

export default class MovieRating {
  private movieId: number;
  private rating: RatingValue;

  constructor({ movieId, rating }: MovieRatingProps) {
    if (!this.isValidRating(rating)) {
      throw new Error("유효하지 않은 평점입니다.");
    }

    this.movieId = movieId;
    this.rating = rating;
  }

  public info(): { movieId: number; rating: RatingValue } {
    return { movieId: this.movieId, rating: this.rating };
  }

  public isSameMovie(movieId: number): boolean {
    return this.movieId === movieId;
  }

  private isValidRating(rating: number): rating is RatingValue {
    return RATING_VALUES.includes(rating);
  }
}
