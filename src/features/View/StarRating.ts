import starFilledImg from "../../images/star_filled.png";
import starEmptyImg from "../../images/star_empty.png";

const STAR_SCORE: Record<number, string> = {
  2: "최악이예요",
  4: "별로예요",
  6: "보통이예요",
  8: "재미있어요",
  10: "명작이예요",
};

export default class StarRating {
  private stars: NodeListOf<HTMLImageElement>;
  private labelEl: HTMLSpanElement;
  private scoreEl: HTMLSpanElement;

  constructor(container: HTMLElement) {
    this.stars = container.querySelectorAll<HTMLImageElement>(".modal-star");
    this.labelEl = container.querySelector<HTMLSpanElement>(".rating-label")!;
    this.scoreEl = container.querySelector<HTMLSpanElement>(".rating-score")!;
  }

  rate(index: number) {
    this.stars.forEach((star, i) => {
      star.src = i < index ? starFilledImg : starEmptyImg;
    });
    const score = index * 2;
    this.labelEl.textContent = STAR_SCORE[score];
    this.scoreEl.textContent = `(${score}/10)`;
  }

  reset() {
    this.stars.forEach((star) => (star.src = starEmptyImg));
    this.labelEl.textContent = "";
    this.scoreEl.textContent = "";
  }
}
