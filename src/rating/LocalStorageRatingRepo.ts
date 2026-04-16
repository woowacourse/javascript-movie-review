import { StorageError } from "../errors/DomainErrors";
import { MovieRatingRepo } from "./MovieRatingRepo";
import { isValidScore, RatingScore } from "./validateScore";

const STORAGE_KEY = "movie-ratings";

export class LocalStorageRatingRepo implements MovieRatingRepo {
  async getRating(movieId: number): Promise<RatingScore | null> {
    const ratings = this.loadAll();
    const stored = ratings[movieId];
    return typeof stored === "number" && isValidScore(stored) ? stored : null;
  }

  async saveRating(movieId: number, score: RatingScore): Promise<void> {
    const ratings = this.loadAll();
    ratings[movieId] = score;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
    } catch (cause) {
      throw new StorageError("별점 저장에 실패했습니다.", cause);
    }
  }

  private loadAll(): Record<number, number> {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    } catch {
      return {};
    }
  }
}
