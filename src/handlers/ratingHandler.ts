import { RATING_SCORES } from "../constants/rating";
import { setLocalStorage } from "../services/storage";
import { fillStars, updateRatingResult } from "../view/movieDetail";

export const handleRatingStarClick = (index: number) => {
  fillStars(index);
  updateRatingResult(index);

  const movieModal = document.querySelector<HTMLElement>(".modal");
  if (!movieModal) return;
  const movieId = movieModal.dataset.movieId;
  if (!movieId) return;
  setLocalStorage(movieId, RATING_SCORES[index]);
};
