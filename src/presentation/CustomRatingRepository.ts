import { RatingStorage } from '../../types/RatingStorage.ts';

export class CustomRatingRepository {
  constructor(private storage: RatingStorage) {}

  getCustomRate(movieId: number): number | null {
    return this.storage.get(movieId);
  }

  saveCustomRate(movieId: number, rating: number): void {
    this.storage.save(movieId, rating);
  }
}
