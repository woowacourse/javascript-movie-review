import { getElementOrThrow } from "./utils";
import FilledStarIcon from "../assets/star_filled.png";
import EmptyStarIcon from "../assets/star_empty.png";

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
    if (savedRatingValue <= 0) {
      this.#dom.text.textContent = "별점을 남겨보세요";
    }
    if (savedRatingValue === 2) {
      this.#dom.text.textContent = "최악이에요 (2/10)";
    }
    if (savedRatingValue === 4) {
      this.#dom.text.textContent = "별로예요 (4/10)";
    }
    if (savedRatingValue === 6) {
      this.#dom.text.textContent = "보통이에요 (6/10)";
    }
    if (savedRatingValue === 8) {
      this.#dom.text.textContent = "재미있어요 (8/10)";
    }
    if (savedRatingValue === 10) {
      this.#dom.text.textContent = "명작이에요 (10/10)";
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
