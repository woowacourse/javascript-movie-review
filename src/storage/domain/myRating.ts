import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from "../utils/localstorage";

export const getMyRating = (movieId: string): number => {
  const RATING_STORAGE_KEY = `rating_${movieId}`;
  const savedRate = getItemFromLocalStorage(RATING_STORAGE_KEY);

  if (!savedRate) return 0;

  const rate = parseInt(savedRate);
  return Number.isNaN(rate) ? 0 : rate;
};

export const setMyRating = (movieId: string, rating: number) => {
  const RATING_STORAGE_KEY = `rating_${movieId}`;
  setItemInLocalStorage(RATING_STORAGE_KEY, `${rating}`);
};
