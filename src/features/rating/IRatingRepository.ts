export interface IRatingRepository {
  save(movieId: number, rating: number): Promise<void>;
  load(movieId: number): Promise<number | null>;
}
