import { STORAGE_KEY } from "../utils/constants";
import { RatingRepository } from "../types/ratingRepository";

export class LocalStorageRatingRepository implements RatingRepository {
  private getAll(): Record<number, number> {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  }

  getRating(movieId: number): number | null {
    return this.getAll()[movieId] ?? null;
  }

  setRating(movieId: number, rating: number): void {
    const all = this.getAll();
    all[movieId] = rating;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }
}
