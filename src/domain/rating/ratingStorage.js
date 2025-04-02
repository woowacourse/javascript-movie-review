import { STORAGE_KEYS } from "./constants/storageKeys.js";

export function setRating(movieId, score) {
  const ratings = JSON.parse(localStorage.getItem(STORAGE_KEYS.RATINGS) || "{}");
  ratings[movieId] = score;
  localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(ratings))
}

export function getRating(movieId) {
  const ratings = JSON.parse(localStorage.getItem(STORAGE_KEYS.RATINGS) || "{}");
  return ratings[movieId] || 0;
}
