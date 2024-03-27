export type Rating = 0 | 2 | 4 | 6 | 8 | 10;

export interface RatingItem {
  movieId: number;
  rating: Rating;
}

export interface MovieRatingManagerInterface {
  getRatingById: (id: number) => Rating;
  updateMovieRating: (id: number, rating: number) => void;
}
