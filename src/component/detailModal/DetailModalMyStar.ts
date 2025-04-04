import { SCORE_RATING_TEXT } from "../../constant/scoreRatingText";
import createDOMElement from "../../util/createDomElement";

interface DetailModalMyStarProps {
  starScore: number;
}

const DetailModalMyStar = ({ starScore }: DetailModalMyStarProps) => {
  const starButtons = Array.from({ length: 5 }, (_, index) =>
    createDOMElement({
      tag: "img",
      id: `starButton${index}`,
      src: "./images/star_empty.png",
      class: "modal-star-button",
    }),
  );
  starButtons.forEach((btn, i) => {
    const img = btn as HTMLImageElement;
    img.src = i < starScore / 2 ? "./images/star_filled.png" : "./images/star_empty.png";
  });

  return createDOMElement({
    tag: "div",
    class: "modal-star-wrapper",
    children: [
      createDOMElement({
        tag: "h3",
        class: "modal-star-title",
        textContent: "내 별점",
      }),
      createDOMElement({
        tag: "div",
        class: "modal-star-box",
        children: [
          createDOMElement({
            tag: "div",
            class: "modal-star-button-wrapper",
            children: starButtons,
          }),
          createDOMElement({
            tag: "span",
            class: "modal-star-text",
            textContent: SCORE_RATING_TEXT[starScore],
            children: [
              starScore > 0
                ? createDOMElement({
                    tag: "span",
                    class: "modal-star-score",
                    textContent: ` (${starScore}/10)`,
                  })
                : null,
            ],
          }),
        ],
      }),
    ],
  });
};

export default DetailModalMyStar;
