import starFilledSrc from "../../../templates/images/star_filled.png";
import starEmptySrc from "../../../templates/images/star_empty.png";

const RATING_LABELS: Record<number, string> = {
  2: "최악이에요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};

interface StarRatingCallbacks {
  onHover: (score: number) => void;
  onLeave: () => void;
  onClick: (score: number) => void;
}

export class StarRating {
  element: HTMLDivElement;

  private stars: HTMLDivElement[];
  private labelEl: HTMLSpanElement;
  private scoreEl: HTMLSpanElement;

  constructor(callbacks: StarRatingCallbacks) {
    this.stars = this.buildStars();
    this.labelEl = this.buildLabelEl();
    this.scoreEl = this.buildScoreEl();
    this.element = this.buildElement();
    this.bindEvents(callbacks);
  }

  render(rating: number | null): void {
    this.updateStars(rating);
    this.updateLabel(rating);
  }

  private updateStars(rating: number | null): void {
    this.stars.forEach((star, i) => {
      const score = (i + 1) * 2;
      star.classList.toggle("filled", rating !== null && score <= rating);
    });
  }

  private updateLabel(rating: number | null): void {
    if (rating === null) {
      this.labelEl.textContent = "\u00A0";
      this.scoreEl.textContent = "";
      return;
    }
    this.labelEl.textContent = RATING_LABELS[rating] ?? "";
    this.scoreEl.textContent = `(${rating}/10)`;
  }

  private buildStars(): HTMLDivElement[] {
    return Array.from({ length: 5 }, () => {
      const starEl = document.createElement("div");
      starEl.className = "my-rating-star";

      const emptyImg = document.createElement("img");
      emptyImg.src = starEmptySrc;
      emptyImg.className = "star-empty";

      const filledImg = document.createElement("img");
      filledImg.src = starFilledSrc;
      filledImg.className = "star-filled";

      starEl.append(emptyImg, filledImg);
      return starEl;
    });
  }

  private buildLabelEl(): HTMLSpanElement {
    const el = document.createElement("span");
    el.className = "my-rating-text";
    el.textContent = "\u00A0";
    return el;
  }

  private buildScoreEl(): HTMLSpanElement {
    const el = document.createElement("span");
    el.className = "my-rating-score";
    return el;
  }

  private buildElement(): HTMLDivElement {
    const starsWrapper = document.createElement("div");
    starsWrapper.className = "my-rating-stars";
    this.stars.forEach((star) => starsWrapper.appendChild(star));

    const desc = document.createElement("div");
    desc.className = "my-rating-desc";
    desc.append(this.labelEl, this.scoreEl);

    const row = document.createElement("div");
    row.className = "my-rating-row";
    row.append(starsWrapper, desc);

    const title = document.createElement("h3");
    title.className = "my-rating-label";
    title.textContent = "내 별점";

    const wrapper = document.createElement("div");
    wrapper.className = "my-rating";
    wrapper.append(title, row);
    return wrapper;
  }

  private bindEvents(callbacks: StarRatingCallbacks): void {
    this.stars.forEach((starEl, i) => {
      const score = (i + 1) * 2;
      starEl.addEventListener("mouseenter", () => callbacks.onHover(score));
      starEl.addEventListener("mouseleave", () => callbacks.onLeave());
      starEl.addEventListener("click", () => callbacks.onClick(score));
    });
  }
}
