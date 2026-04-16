import { MovieRatingRepo } from "./MovieRatingRepo";

const STORAGE_KEY = "movie-ratings";

export class LocalStorageRatingRepo implements MovieRatingRepo {
  async getRating(movieId: number): Promise<number | null> {
    const ratings = this.loadAll();
    return ratings[movieId] ?? null;
  }

  async saveRating(movieId: number, score: number): Promise<void> {
    const ratings = this.loadAll();
    ratings[movieId] = score;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
  }

  private loadAll(): Record<number, number> {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    } catch {
      return {};
    }
  }
}