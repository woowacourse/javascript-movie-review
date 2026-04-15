import { isRatingScore, RATING_SCORES } from "../constants/rating";
import { ratingStorage } from "../services/ratingStorage";
import { fillStars, updateRatingResult } from "../view/movieDetail";

export const handleRatingStarClick = (index: number) => {
  const ratingScore = RATING_SCORES[index];
  if (!isRatingScore(ratingScore)) return;

  fillStars(index);
  updateRatingResult(index);

  const movieModal = document.querySelector<HTMLElement>(".modal");
  if (!movieModal) return;
  const movieId = movieModal.dataset.movieId;
  if (!movieId) return;

  ratingStorage.set(movieId, ratingScore);
};
