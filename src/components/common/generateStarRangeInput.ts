import EMPTY_STAR from "../../../templates/star_empty.png";
import FILLED_STAR from "../../../templates/star_filled.png";
import createElement from "../utils/createElement";

const generateStarRangeInput = (
  onChangeHandler: (e: Event) => void,
  value: number = 0
) => {
  const rangeInput = createElement({
    tagName: "input",
    attribute: {
      type: "range",
      value: String(value),
      min: "0",
      max: "5",
      class: "star star-range-input",
    },
    eventListener: {
      change: onChangeHandler,
    },
  });

  const emptyStars = Array.from({ length: 5 }).map((_) => {
    return createElement({
      tagName: "img",
      attribute: { src: EMPTY_STAR, alt: "비어있는 별" },
    });
  });

  const filledStars = Array.from({ length: 5 }).map((_) => {
    return createElement({
      tagName: "img",
      attribute: { src: FILLED_STAR, alt: "채워진 별" },
    });
  });

  const emptyStarBox = createElement({
    tagName: "span",
    attribute: { class: "star empty-star" },
    children: [...emptyStars],
  });

  const filledStarBox = createElement({
    tagName: "span",
    attribute: { class: "star filled-star" },
    children: [...filledStars],
  });

  const inputBox = createElement({
    tagName: "div",
    attribute: { class: "star" },
    children: [emptyStarBox, filledStarBox, rangeInput],
    eventListener: {
      input: (e) => {
        drawStar(e.target as HTMLInputElement, filledStarBox);
      },
    },
  });

  drawStar(rangeInput as HTMLInputElement, filledStarBox);

  return inputBox;
};

const drawStar = (input: HTMLInputElement, filledStarBox: HTMLSpanElement) => {
  const value = Number(input.value);
  filledStarBox.style.width = `${value * 25}px`;
};

export default generateStarRangeInput;
