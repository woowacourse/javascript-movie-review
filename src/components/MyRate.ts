import RateStorage from "../storages/RateStorage";
import { isHTMLElement } from "../utils/typeGuards";

export const MyRateSkeleton = () => {
  return `
  <div>내 별점</div>
  <div class="star-container"> 
    <span class="stars">
      <img src="./images/star_empty.png" id="star-1" />
      <img src="./images/star_empty.png" id="star-2" />
      <img src="./images/star_empty.png" id="star-3" />
      <img src="./images/star_empty.png" id="star-4" />
      <img src="./images/star_empty.png" id="star-5" />
    </span>
    <span class="rate-comment">   (0/10)</span>
  </div>
  `;
};
class MyRate {
  #parentElement: HTMLElement;
  #movieId: number;

  constructor(parentElement: HTMLElement, movieId: number) {
    this.#parentElement = parentElement;
    this.#movieId = movieId;
    this.#render();
    this.#addEventListeners();
    this.#loadRate();
  }

  #loadRate() {
    const rate = RateStorage.getRate(`${this.#movieId}`);
    const $currentStar = this.#parentElement.querySelector(`#star-${rate / 2}`);

    if (!isHTMLElement($currentStar)) return;
    $currentStar.click();
  }

  #render() {
    const totalStars = [1, 2, 3, 4, 5]
      .map((id) => `<img src="./images/star_empty.png" id="star-${id}" />`)
      .join("");
    this.#parentElement.innerHTML = `
    <div>내 별점</div>
    <div class="star-container"> 
      <span class="stars">${totalStars}</span>
      <span class="rate-comment">   (0/10)</span>
    </div>
    `;
  }

  #addEventListeners() {
    this.#parentElement.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (!target.matches("img")) return;

      RateStorage.saveRate({
        id: `${this.#movieId}`,
        rate: Number(target.id.split("-")[1]) * 2,
      });

      const ratedStars = [1, 2, 3, 4, 5]
        .map((id) => {
          if (id <= Number(target.id.split("-")[1])) {
            return `<img src="./images/star_filled.png" id="star-${id}" />`;
          } else {
            return `<img src="./images/star_empty.png" id="star-${id}" />`;
          }
        })
        .join("");

      const $stars = this.#parentElement.querySelector(".stars");
      const $rateComment = this.#parentElement.querySelector(".rate-comment");

      if (!isHTMLElement($stars) || !isHTMLElement($rateComment)) return;

      $rateComment.textContent =
        getRateCommentById(Number(target.id.split("-")[1])) +
        ` (${Number(target.id.split("-")[1]) * 2}/10)`;
      $stars.innerHTML = ratedStars;
    });
  }
}

const RATE_COMMENTS = [
  { rate: 2, starID: 1, comment: "최악이에요" },
  { rate: 4, starID: 2, comment: "별로예요" },
  { rate: 6, starID: 3, comment: "보통이에요" },
  { rate: 8, starID: 4, comment: "재미있어요" },
  { rate: 10, starID: 5, comment: "명작이에요" },
];

const getRateCommentById = (id: number) => {
  return RATE_COMMENTS.find((comment) => comment.starID === id)?.comment ?? "";
};

export default MyRate;
