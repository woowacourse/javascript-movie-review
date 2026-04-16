import { RatingStorage } from '../../types/RatingStorage.ts';

export const localStorageRatingStorage: RatingStorage = {
  get(movieId) {
    const rate = localStorage.getItem(String(movieId));
    return rate ? Number(rate) : null;
  },
  save(movieId, rating) {
    localStorage.setItem(String(movieId), String(rating));
  },
};
