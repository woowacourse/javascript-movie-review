import { IRatingRepository } from "./IRatingRepository";

export class LocalStorageRatingRepository implements IRatingRepository {
  async save(movieId: number, rating: number): Promise<void> {
    localStorage.setItem(`rating_${movieId}`, String(rating));
  }

  async load(movieId: number): Promise<number | null> {
    const value = localStorage.getItem(`rating_${movieId}`);
    return value !== null ? Number(value) : null;
  }
}
