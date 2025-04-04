import createElement from "../../utils/createElement";
import { SCORE_MESSAGE } from "../../Constants/constants";

const renderStars = (
  rating: number,
  $stars: HTMLDivElement,
  $score: HTMLSpanElement,
  $comment: HTMLParagraphElement,
  movieId: number,
  rerender: (rating: number) => void
) => {
  $stars.replaceChildren();
  const score = rating * 2;
  $score.textContent = `(${score}/10)`;
  $comment.textContent = SCORE_MESSAGE[score];

  const filledCount = rating;
  const emptyCount = 5 - rating;

  Array.from({ length: filledCount }).forEach((_, index) => {
    const $star = createElement({
      tag: "img",
      classNames: ["star"],
      src: "./images/star_filled.png",
      dataset: { order: String(index + 1) },
    }) as HTMLImageElement;
    $stars.appendChild($star);
  });

  Array.from({ length: emptyCount }).forEach((_, index) => {
    const $star = createElement({
      tag: "img",
      classNames: ["star"],
      src: "./images/star_empty.png",
      dataset: { order: String(filledCount + index + 1) },
    }) as HTMLImageElement;
    $stars.appendChild($star);
  });

  $stars.onclick = (event: MouseEvent) => {
    const $target = event.target as HTMLElement;
    const order = $target.dataset?.order;
    if (!order) return;

    const saved = JSON.parse(localStorage.getItem("myRating")!) ?? {};
    const newState = JSON.stringify({ ...saved, [movieId]: order });
    localStorage.setItem("myRating", newState);
    rerender(Number(order));
  };
};

export default renderStars;
