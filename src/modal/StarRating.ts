import { isValidScore, RatingScore } from "../rating/validateScore";

const RATING_LABELS: Record<number, string> = {
  2: "최악이예요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};

export class StarRating {
  private score: number = 0;

  constructor(
    private readonly container: HTMLDivElement,
    private readonly label: HTMLParagraphElement,
    private readonly onRate: (score: RatingScore) => void,
  ) {
    this.render();
    this.container.addEventListener("click", this.handleClick);
  }

  setScore(score: RatingScore): void {
    this.score = score;
    this.render();
  }

  private render(): void {
    const stars = Array.from({ length: 5 }, (_, i) => {
      const starScore = (i + 1) * 2;
      const filled = starScore <= this.score;
      const src = filled
        ? "./images/star_filled.png"
        : "./images/star_empty.png";
      return `<img src="${src}" class="star-rating-star" data-score="${starScore}" alt="${i + 1}점" />`;
    }).join("");

    this.container.innerHTML = stars;

    if (this.score > 0) {
      this.label.textContent = `${RATING_LABELS[this.score]} (${this.score}/10)`;
    } else {
      this.label.textContent = "";
    }
  }

  private handleClick = (event: Event): void => {
    const target = event.target as HTMLElement;

    if (!target.matches(".star-rating-star")) return;

    const score = Number(target.dataset.score);
    if (!isValidScore(score)) return;

    this.score = score;
    this.render();
    this.onRate(score);
  };
}
