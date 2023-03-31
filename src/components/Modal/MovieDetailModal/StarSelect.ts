import filledStarImage from "../../../../templates/star_filled.png";
import emptyStarImage from "../../../../templates/star_empty.png";

import { $ } from "../../../utils/selector";

const STAR_RATE_STRING = [
  "나의 점수는?",
  "최악이예요",
  "별로예요",
  "보통이예요",
  "재미있어요",
  "명작이예요",
];

export function renderStars(movieId: number, starRate: number) {
  const starRateContainer = $(".modal-star-rate");

  if (starRateContainer instanceof HTMLElement)
    starRateContainer.innerHTML = getStarSelectContainerTemplate(
      movieId,
      starRate
    );
}

export function getStarSelectContainerTemplate(
  movieId: number,
  starRate: number
) {
  const imgArray = getStarTemplate(movieId, starRate);

  return /*html*/ `
      <span 
        class="select-zero-rate" 
        data-movie-id="${movieId}" 
        data-star-rate="0"
      >
        내 별점
      </span>
      <span class="star-select-container">
        ${imgArray.join("")}
      </span>
      <span>${starRate * 2}점</span>
      <span class="star-rate-desc">${STAR_RATE_STRING[starRate]}</span>
    `;
}

export function getStarTemplate(movieId: number, starRate: number) {
  return Array.from(
    { length: 5 },
    (_, i) =>
      `<img 
            src="${starRate > i ? filledStarImage : emptyStarImage}" 
            alt="별점" 
            class="star-rate-select-img" 
            data-movie-id="${movieId}" 
            data-star-rate="${i + 1}" 
        />`
  );
}
