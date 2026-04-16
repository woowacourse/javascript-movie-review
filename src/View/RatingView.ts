import { getElementOrThrow } from "./utils";
import FilledStarIcon from "../assets/star_filled.png";
import EmptyStarIcon from "../assets/star_empty.png";
import { RATING } from "../constants/raintg";

class RatingView {
  #dom;

  constructor() {
    this.#dom = {
      container: getElementOrThrow<HTMLDivElement>(".review-star-container"),
      stars: document.querySelectorAll(".review-star"),
      text: getElementOrThrow<HTMLSpanElement>(".review-text"),
      score: getElementOrThrow<HTMLSpanElement>(".review-score"),
    };
  }

  renderByRatingValue(savedRatingValue: number) {
    this.#dom.stars.forEach((star) => {
      if (Number(star.getAttribute("data-score")) <= savedRatingValue) {
        (star as HTMLImageElement).src = FilledStarIcon;
      } else {
        (star as HTMLImageElement).src = EmptyStarIcon;
      }
    });
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

  bindRatingStarClick(handler: (ratingValue: number) => void) {
    this.#dom.container.addEventListener("click", (e: MouseEvent) => {
      let star = (e.target as HTMLElement).closest(".review-star");

      if (!star) return;
      const ratingValue = star.getAttribute("data-score");
      if (!ratingValue) {
        throw new Error("올바른 별점이 설정되지 않았습니다.");
      }
      handler(Number(ratingValue));
    });
  }
}

export default RatingView;
