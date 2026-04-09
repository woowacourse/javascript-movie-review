export interface MovieRatingRepo {
  getRating(movieId: number): number | null;

  saveRating(movieId: number, score: number): void;
}
