export interface RatingStorage {
  getRating(movieId: number): number;
  setRating(movieId: number, score: number): void;
}
