import { getElement } from "../view/getElementView.ts";

type handler = {
  onRate: (movieId: number, userRate: number) => void;
};

export const bindRatingEvent = ({ onRate }: handler) => {
  // 별점 매기기
  const ratingContainer = getElement(".star-container", HTMLElement);

  ratingContainer.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    const star = target.closest(".star");

    if (!star) return;

    const movieId = Number(ratingContainer.getAttribute("data-movie-id"));
    const userRate = Number(star.getAttribute("value"));

    onRate(movieId, userRate);
  });
};
