import { RatingStorage, LocalStorageRatingStorage } from "./RatingStorage";
import { AsyncService, AsyncState } from "../AsyncService";

export type RatingState = AsyncState<number | null>;

export class RatingService extends AsyncService<number | null> {
  private storage: RatingStorage;
  private ratings: Record<number, number>;

  constructor(storage: RatingStorage = new LocalStorageRatingStorage()) {
    super();
    this.storage = storage;
    this.ratings = this.storage.load();
  }

  get(movieId: number): number | null {
    return this.ratings[movieId] ?? null;
  }

  set(movieId: number, rating: number): void {
    this.ratings[movieId] = rating;
    this.storage.save(this.ratings);
    this.notify(rating);
  }
}
