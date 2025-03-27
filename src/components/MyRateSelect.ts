import {
  MOVIE_NO_RATE_COMMENT,
  MOVIE_RATE_COMMENT,
  MOVIE_RATE_LIST_KEY,
} from "../constants/MovieRate";
import LocalStorage from "../utils/localStorage";
import { $, $$ } from "../utils/querySelectors";

const MyRateSelect = {
  create(movieId: number) {
    const myRateElement = document.createElement("div");
    myRateElement.classList.add("my-rate");
    const content = /*html*/ `
      <div class="star-container">
        <img data-value="2" src="./images/star_empty.png" class="star" />
        <img data-value="4" src="./images/star_empty.png" class="star" />
        <img data-value="6" src="./images/star_empty.png" class="star" />
        <img data-value="8" src="./images/star_empty.png" class="star" />
        <img data-value="10" src="./images/star_empty.png" class="star" />
      </div>
      <p class="my-rate-description">
        ${MOVIE_NO_RATE_COMMENT} <span class="my-rate-score">(-/10)</span>
      </p>
    `;
    myRateElement.insertAdjacentHTML("beforeend", content);

    const score: number = LocalStorage.getJSON(MOVIE_RATE_LIST_KEY)[movieId];
    this.set(score, myRateElement);

    return myRateElement;
  },

  set(
    score: number = 0,
    myRateElement: HTMLDivElement = $<HTMLDivElement>(".my-rate")
  ) {
    const stars = $$<HTMLImageElement>(".star", myRateElement);
    stars.forEach((star) => {
      star.src =
        score >= Number(star.dataset.value)
          ? "./images/star_filled.png"
          : "./images/star_empty.png";
    });

    const rateDescription = $<HTMLParagraphElement>(
      ".my-rate-description",
      myRateElement
    );
    rateDescription.innerHTML = /*html*/ `
    ${
      MOVIE_RATE_COMMENT[score] ?? MOVIE_NO_RATE_COMMENT
    } <span class="my-rate-score">(${score !== 0 ? score : "-"}/10)</span>
    `;
  },
};

export default MyRateSelect;
