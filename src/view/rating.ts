import {
  isRatingScore,
  RATING_SCORES,
  RATING_TEXTS,
} from "../constants/rating";
import { ratingStorage } from "../services/ratingStorage";

export const restoreRatingView = (movieId: string) => {
  const savedRating = ratingStorage.get(movieId);
  if (!isRatingScore(savedRating)) return;

  const index = RATING_SCORES.indexOf(savedRating);
  fillRatingStars(index);
  updateRatingSummary(index);
};

export const fillRatingStars = (index: number) => {
  const stars = document.querySelectorAll<HTMLImageElement>(".stars img");

  stars.forEach((currentStar, currentIndex) => {
    currentStar.src =
      currentIndex <= index
        ? "./images/star_filled.png"
        : "./images/star_empty.png";
  });
};

export const updateRatingSummary = (index: number) => {
  const ratingText = document.querySelector(".rating-text");
  if (ratingText) ratingText.textContent = RATING_TEXTS[index];

  const ratingValue = document.querySelector("#rating-value");
  if (ratingValue) ratingValue.textContent = RATING_SCORES[index];
};

export const resetRatingView = (movieModal: HTMLElement) => {
  const stars = movieModal.querySelectorAll<HTMLImageElement>(".stars img");
  stars.forEach((star) => (star.src = "./images/star_empty.png"));

  const ratingText = movieModal.querySelector(".rating-text");
  if (ratingText) ratingText.textContent = "평가해주세요";

  const ratingValue = movieModal.querySelector("#rating-value");
  if (ratingValue) ratingValue.textContent = "0";
};
