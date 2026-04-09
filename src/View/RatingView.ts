import { getElementOrThrow } from "./utils";
import FilledStarIcon from "../assets/star_filled.png";
import EmptyStarIcon from "../assets/star_empty.png";
import { RATING } from "../constants/raintg";

class RatingView {
  #dom;

  constructor() {
    this.#dom = {
      container: getElementOrThrow<HTMLDivElement>(".review-star-container"),
      firstStar: getElementOrThrow<HTMLImageElement>(".star-first"),
      secondStar: getElementOrThrow<HTMLImageElement>(".star-second"),
      thirdStar: getElementOrThrow<HTMLImageElement>(".star-third"),
      fourthStar: getElementOrThrow<HTMLImageElement>(".star-fourth"),
      fifthStar: getElementOrThrow<HTMLImageElement>(".star-fifth"),
      text: getElementOrThrow<HTMLSpanElement>(".review-text"),
      score: getElementOrThrow<HTMLSpanElement>(".review-score"),
    };
  }

  setRating(ratingValue: string) {
    this.#dom.container.dataset.ratingValue = ratingValue;
  }

  renderByRatingValue(savedRatingValue: number) {
    // 리팩토링 필수
    if (
      Number(this.#dom.firstStar.getAttribute("data-score")) <= savedRatingValue
    ) {
      this.#dom.firstStar.src = FilledStarIcon;
    } else {
      this.#dom.firstStar.src = EmptyStarIcon;
    }
    if (
      Number(this.#dom.secondStar.getAttribute("data-score")) <=
      savedRatingValue
    ) {
      this.#dom.secondStar.src = FilledStarIcon;
    } else {
      this.#dom.secondStar.src = EmptyStarIcon;
    }
    if (
      Number(this.#dom.thirdStar.getAttribute("data-score")) <= savedRatingValue
    ) {
      this.#dom.thirdStar.src = FilledStarIcon;
    } else {
      this.#dom.thirdStar.src = EmptyStarIcon;
    }
    if (
      Number(this.#dom.fourthStar.getAttribute("data-score")) <=
      savedRatingValue
    ) {
      this.#dom.fourthStar.src = FilledStarIcon;
    } else {
      this.#dom.fourthStar.src = EmptyStarIcon;
    }
    if (
      Number(this.#dom.fifthStar.getAttribute("data-score")) <= savedRatingValue
    ) {
      this.#dom.fifthStar.src = FilledStarIcon;
    } else {
      this.#dom.fifthStar.src = EmptyStarIcon;
    }
    this.#renderText(savedRatingValue);
  }

  #renderText(savedRatingValue: number) {
    if (savedRatingValue <= RATING.INITIAL.SCORE) {
      this.#dom.text.textContent = RATING.INITIAL.MESSAGE;
      this.#dom.score.textContent = `(${RATING.MIN_SCORE}/${RATING.MAX_SCORE})`;
    }
    if (savedRatingValue === RATING.TERRIBLE.SCORE) {
      this.#dom.text.textContent = RATING.TERRIBLE.MESSAGE;
      this.#dom.score.textContent = `(${RATING.TERRIBLE.SCORE}/${RATING.MAX_SCORE})`;
    }
    if (savedRatingValue === RATING.POOR.SCORE) {
      this.#dom.text.textContent = RATING.POOR.MESSAGE;
      this.#dom.score.textContent = `(${RATING.POOR.SCORE}/${RATING.MAX_SCORE})`;
    }
    if (savedRatingValue === RATING.AVERAGE.SCORE) {
      this.#dom.text.textContent = RATING.AVERAGE.MESSAGE;
      this.#dom.score.textContent = `(${RATING.AVERAGE.SCORE}/${RATING.MAX_SCORE})`;
    }
    if (savedRatingValue === RATING.GOOD.SCORE) {
      this.#dom.text.textContent = RATING.GOOD.MESSAGE;
      this.#dom.score.textContent = `(${RATING.GOOD.SCORE}/${RATING.MAX_SCORE})`;
    }
    if (savedRatingValue === RATING.EXCELLENT.SCORE) {
      this.#dom.text.textContent = RATING.EXCELLENT.MESSAGE;
      this.#dom.score.textContent = `(${RATING.EXCELLENT.SCORE}/${RATING.MAX_SCORE})`;
    }
  }

  bindEvent(handler: (ratingValue: string) => void) {
    this.#dom.container.addEventListener("click", (e: MouseEvent) => {
      let star = (e.target as HTMLElement).closest(".review-star");

      if (!star) return;
      const ratingValue = star.getAttribute("data-score");
      if (!ratingValue) {
        throw new Error("올바른 별점이 설정되지 않았습니다.");
      }
      handler(ratingValue);
    });
  }
}

export default RatingView;
