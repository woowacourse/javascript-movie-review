import { createElement } from "../../utils/createElement.ts";
import { $, $$ } from "../../utils/dom.ts";

const SCORE_AND_LABEL: Record<number, string> = {
  0: "평가하지 않았어요",
  2: "최악이에요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};

const MyRating = () => {
  const starsHTML = Array.from({ length: 5 })
    .map(
      (_, i) =>
        `<img src="./images/star_empty.png" class="star" data-index="${i}" />`
    )
    .join("");

  const myRating = createElement(/*html*/ `
    <div>
      <h3>내 별점</h3>
      <div class="my-rate">
        <div class="star-container">
          ${starsHTML}
        </div>
        <div class="label">
          <div>${SCORE_AND_LABEL[0]}</div>
          <div class="score">(0/10)</div>
        </div>
      </div>
    </div>
  `);

  const starContainer = $(".star-container", myRating);
  const label = $(".label div", myRating);
  const score = $(".score", myRating);
  const stars = $$(".star", starContainer);

  let currentScore = 0;
  let selectedScore = 0;
  let selectedStarIdx = -1;

  stars.forEach((star, i) => {
    star.addEventListener("mouseover", () => {
      currentScore = (i + 1) * 2;

      stars.forEach((s, j) => {
        s.setAttribute(
          "src",
          j <= i ? "./images/star_filled.png" : "./images/star_empty.png"
        );
      });

      label.textContent = SCORE_AND_LABEL[currentScore];
      score.textContent = `(${currentScore}/10)`;
    });
    star.addEventListener("mouseleave", () => {
      if (selectedStarIdx === -1) {
        stars.forEach((s) => {
          s.setAttribute("src", "./images/star_empty.png");
        });

        currentScore = 0;
        label.textContent = SCORE_AND_LABEL[currentScore];
        score.textContent = `(${currentScore}/10)`;
      } else {
        selectedScore = (selectedStarIdx + 1) * 2;
        stars.forEach((s, j) => {
          s.setAttribute(
            "src",
            j <= selectedStarIdx
              ? "./images/star_filled.png"
              : "./images/star_empty.png"
          );
        });
        label.textContent = SCORE_AND_LABEL[selectedScore];
        score.textContent = `(${selectedScore}/10)`;
      }
    });
    star.addEventListener("click", () => {
      currentScore = (i + 1) * 2;
      selectedStarIdx = i;

      stars.forEach((s, j) => {
        s.setAttribute(
          "src",
          j <= i ? "./images/star_filled.png" : "./images/star_empty.png"
        );
      });

      label.textContent = SCORE_AND_LABEL[currentScore];
      score.textContent = `(${currentScore}/10)`;
    });
  });

  return myRating;
};

export default MyRating;
