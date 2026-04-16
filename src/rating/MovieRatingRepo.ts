export interface MovieRatingRepo {
  getRating(movieId: number): Promise<number | null>;

  saveRating(movieId: number, score: number): Promise<void>;
}
