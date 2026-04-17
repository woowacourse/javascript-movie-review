const STORAGE_KEY = "ratings";

export interface RatingStorage {
  load(): Record<number, number>;
  save(ratings: Record<number, number>): void;
}

export class LocalStorageRatingStorage implements RatingStorage {
  load(): Record<number, number> {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    } catch {
      return {};
    }
  }

  save(ratings: Record<number, number>): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
  }
}
