import { getElement } from "./getElementView";
import star_filled from "../../templates/images/star_filled.png";
import star_empty from "../../templates/images/star_empty.png";

export const getRateDescription = (userRate: number) => {
  switch (userRate) {
    case 1:
      return "최악이예요";
    case 2:
      return "별로예요";
    case 3:
      return "보통이에요";
    case 4:
      return "재미있어요";
    case 5:
      return "명작이에요";
    default:
      return "별점 평가 전";
  }
};

export const getRateScoreText = (userRate: number) => {
  return userRate === 0 ? "(0/10)" : `(${userRate * 2}/10)`;
};

export const renderUserRate = (movieId: number, userRate: number) => {
  const ratingContainer = getElement(
    `.star-container[data-movie-id="${movieId}"]`,
    HTMLElement,
  );

  const stars = ratingContainer.querySelectorAll(".star");

  stars.forEach((star) => {
    if (!(star instanceof HTMLImageElement)) return;

    const value = Number(star.getAttribute("value"));
    const isActive = value <= userRate;

    // star.classList.toggle("is-active", isActive);
    star.src = isActive ? star_filled : star_empty;
  });

  const description = getElement(".rate-description", HTMLElement);
  description.textContent = getRateDescription(userRate);

  const percentage = getElement(".rate-percentage", HTMLElement);
  percentage.textContent = getRateScoreText(userRate);
};
