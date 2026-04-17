export interface RatingStore {
  getRating(movieId: number): number | null;
  setRating(movieId: number, rating: number): void;
}

const localStorageRatingStore: RatingStore = {
  getRating(movieId: number): number | null {
    const stored = localStorage.getItem(`movie-rating:${movieId}`);
    return stored !== null ? Number(stored) : null;
  },

  setRating(movieId: number, rating: number): void {
    localStorage.setItem(`movie-rating:${movieId}`, String(rating));
  },
};

export const ratingStore: RatingStore = localStorageRatingStore;
