export interface RatingStorage {
  get(movieId: number): number;
  save(movieId: number, rating: number): void;
}

export class LocalRatingStorage implements RatingStorage {
  get(movieId: number): number {
    return Number(localStorage.getItem(`rating_${movieId}`)) || 0;
  }

  save(movieId: number, rating: number): void {
    localStorage.setItem(`rating_${movieId}`, String(rating));
  }
}
