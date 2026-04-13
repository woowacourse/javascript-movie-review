import { IRatingRepository } from "./IRatingRepository";

const RATING_KEY_PREFIX = "rating_";

export class LocalStorageRatingRepository implements IRatingRepository {
  async save(movieId: number, rating: number): Promise<void> {
    localStorage.setItem(`${RATING_KEY_PREFIX}${movieId}`, String(rating));
  }

  async load(movieId: number): Promise<number | null> {
    const value = localStorage.getItem(`${RATING_KEY_PREFIX}${movieId}`);
    return value !== null ? Number(value) : null;
  }
}
