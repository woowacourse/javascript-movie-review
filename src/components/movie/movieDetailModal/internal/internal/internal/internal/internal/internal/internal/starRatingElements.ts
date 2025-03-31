import { createElementWithAttributes } from "../../../../../../../../../utils/createElementWithAttributes";
import { getScoresArray } from "./comment";
import emptyStar from "/images/star_empty.png";
import filledStar from "/images/star_filled.png";

const starRatingElements = (myMovieRate: number) => {
  const $fragment = document.createDocumentFragment();

  getScoresArray().forEach((score, idx) => {
    const commonId = `rate-check-${idx}`;
    const $label = createElementWithAttributes({
      tag: "label",
      attributes: { for: commonId },
      children: [
        {
          tag: "img",
          id: `rate-img-${idx}`,
          className: "star",
          attributes: {
            src:
              myMovieRate >= Number.parseInt(score, 10)
                ? filledStar
                : emptyStar,
            alt: `${score}점`,
          },
        },
      ],
    });

    const $input = createElementWithAttributes({
      tag: "input",
      id: commonId,
      className: "rate-check-input",
      attributes: {
        type: "radio",
        value: score,
        name: "rate",
      },
    });
    $fragment.append($label, $input);
  });

  return $fragment;
};

export default starRatingElements;
