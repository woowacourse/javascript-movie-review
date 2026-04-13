const STORAGE_KEY = "ratings";

export class RatingService {
  private ratings: Record<number, number>;

  constructor() {
    this.ratings = this.load();
  }

  get(movieId: number): number | null {
    return this.ratings[movieId] ?? null;
  }

  set(movieId: number, rating: number): void {
    this.ratings[movieId] = rating;
    this.save();
  }

  private load(): Record<number, number> {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    } catch {
      return {};
    }
  }

  private save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ratings));
  }
}
