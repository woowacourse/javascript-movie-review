import { RATING_SCORES, RATING_TEXTS } from "./constants/rating";
import { setLocalStorage } from "./services/storage";

export const handleRatingStarClick = (
  stars: NodeListOf<HTMLImageElement>,
  index: number,
) => {
  fillStars(stars, index);
  updateRatingResult(index);

  const movieModal = document.querySelector<HTMLElement>(".modal");
  if (!movieModal) return;
  const movieId = movieModal.dataset.movieId;
  if (!movieId) return;
  setLocalStorage(movieId, RATING_SCORES[index]);
};

const fillStars = (stars: NodeListOf<HTMLImageElement>, index: number) => {
  stars.forEach((currentStar, currentIndex) => {
    currentStar.src =
      currentIndex <= index
        ? "./images/star_filled.png"
        : "./images/star_empty.png";
  });
};

const updateRatingResult = (index: number) => {
  const ratingText = document.querySelector(".rating-text");
  if (ratingText) ratingText.textContent = RATING_TEXTS[index];

  const ratingValue = document.querySelector("#rating-value");
  if (ratingValue) ratingValue.textContent = RATING_SCORES[index];
};
