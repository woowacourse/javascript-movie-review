export type Rating = 0 | 2 | 4 | 6 | 8 | 10;

export interface RatingItem {
  movieId: number;
  rating: Rating;
}
