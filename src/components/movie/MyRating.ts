import { MovieDetail } from "../../../types/movie";
import { createElement } from "../../utils/createElement.ts";
import { $, $$ } from "../../utils/dom.ts";
import { getUserRating, saveUserRating } from "../../utils/localStorage.ts";

const SCORE_AND_LABEL: Record<number, string> = {
  0: "평가하지 않았어요",
  2: "최악이에요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};

const MyRating = (movie: MovieDetail) => {
  const myRate = getUserRating(movie.id);
  const myScore = myRate ? myRate.score : 0;
  const filledCount = myRate ? myRate.score / 2 : 0;
  const starsHTML = Array.from({ length: 5 })
    .map((_, i) => {
      const src =
        i < filledCount
          ? "./images/star_filled.png"
          : "./images/star_empty.png";
      return `<img src="${src}" class="star" data-index="${i}" />`;
    })
    .join("");

  const myRating = createElement(/*html*/ `
    <div>
      <h3>내 별점</h3>
      <div class="my-rate">
        <div class="star-container">
          ${starsHTML}
        </div>
        <div class="label">
          <div>${SCORE_AND_LABEL[myScore]}</div>
          <div class="score">(${myScore}/10)</div>
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
      updateStars(stars, i);
      updateScoreText(label, score, currentScore);
    });

    star.addEventListener("mouseleave", () => {
      if (selectedScore === 0 && myScore !== 0) {
        selectedScore = myScore;
        selectedStarIdx = filledCount - 1;
      }
      if (selectedStarIdx === -1) {
        updateStars(stars, -1);
        updateScoreText(label, score, 0);
      } else {
        selectedScore = (selectedStarIdx + 1) * 2;
        updateStars(stars, selectedStarIdx);
        updateScoreText(label, score, selectedScore);
      }
    });

    star.addEventListener("click", () => {
      currentScore = (i + 1) * 2;
      selectedStarIdx = i;
      updateStars(stars, i);
      updateScoreText(label, score, currentScore);
      saveUserRating(movie.id, currentScore);
    });

    const updateStars = (stars: HTMLElement[], fillUntil: number) => {
      stars.forEach((s, i) => {
        const src =
          i <= fillUntil
            ? "./images/star_filled.png"
            : "./images/star_empty.png";
        s.setAttribute("src", src);
      });
    };

    const updateScoreText = (
      label: HTMLElement,
      score: HTMLElement,
      value: number
    ) => {
      label.textContent = SCORE_AND_LABEL[value];
      score.textContent = `(${value}/10)`;
    };
  });

  return myRating;
};

export default MyRating;
