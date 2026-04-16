export interface RatingRepository {
  getRating(movieId: number): number | null;
  setRating(movieId: number, rating: number): void;
}
