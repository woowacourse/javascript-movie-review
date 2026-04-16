export interface RatingRepository {
  save(movieId: number, rating: number): Promise<void>;
  load(movieId: number): Promise<number | null>;
}