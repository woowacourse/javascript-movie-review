export interface RatingStorage {
  get(movieId: number): number | null;
  save(movieId: number, rating: number): void;
}
