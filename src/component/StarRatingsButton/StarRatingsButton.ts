import "./starRatingsButton.style.css";

import emptyStarImg from "../../image/star_empty.png";
import { createElement } from "../../utility/dom";

export const StarRatingButton = {
  createStarRatingButton() {
    const starRatingButton = createElement("button", {
      class: "star-rating-button",
      type: "button",
      ariaLabel: "evaluate-movie",
    });

    const emptyStar = createElement("img", {
      src: emptyStarImg,
      alt: "",
    });

    starRatingButton.appendChild(emptyStar);

    return starRatingButton;
  },
};
