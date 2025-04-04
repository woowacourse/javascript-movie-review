import { RATING_MESSAGE } from "../../constant/ratingMessage";
import createDOMElement from "../../util/createDomElement";

const STAR_LENGTH = 5;

const MyStarRatingComponent = (starScore: number) => {
  return createDOMElement({
    tag: "div",
    className: "my-star",
    children: [
      createDOMElement({
        tag: "div",
        className: "star-wrapper",
        children: starScoreComponent(starScore),
      }),
      createDOMElement({
        tag: "span",
        className: "star-description-ment",
        children: [
          createDOMElement({
            tag: "div",
            className: "rating-ment",
            textContent: RATING_MESSAGE[starScore],
          }),
          createDOMElement({
            tag: "div",
            className: "rating-number",
            textContent: starScore ? `(${starScore}/10)` : "",
          }),
        ],
      }),
    ],
  });
};

export default MyStarRatingComponent;

const starScoreComponent = (starScore: number) => {
  if (starScore) {
    return Array.from({ length: STAR_LENGTH }, (_, index) =>
      createDOMElement({
        tag: "img",
        src: starScore > 0 && index < starScore / 2 ? "./images/star_filled.png" : "./images/star_empty.png",
      }),
    );
  }
  return Array.from({ length: STAR_LENGTH }, () =>
    createDOMElement({
      tag: "img",
      src: "./images/star-empty.png",
    }),
  );
};
