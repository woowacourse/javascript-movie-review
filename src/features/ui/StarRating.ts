import { RatingRepository } from "../rating/RatingRepository";
import starSpriteImg from "../../images/stars_sprite.png";

const STAR_COUNT = 5;
const SCORE_PER_STAR = 2;

const RATING_LABELS: Record<number, string> = {
  2: "최악이에요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};

export class StarRating {
  private currentRating: number = 0;

  constructor(
    private container: HTMLElement,
    private movieId: number,
    private repository: RatingRepository
  ) {}

  async mount(): Promise<void> {
    const saved = await this.repository.load(this.movieId);
    this.currentRating = saved ?? 0;
    this.container.innerHTML = this.buildHTML();
    this.attach();
  }

  private buildHTML(): string {
    // DOM 순서: 10→2 (flex-direction: row-reverse로 1→5 표시)
    const stars = Array.from({ length: STAR_COUNT }, (_, i) => {
      const value = (STAR_COUNT - i) * SCORE_PER_STAR;
      const checked = value === this.currentRating ? "checked" : "";
      return `
        <input type="radio" name="rating-${this.movieId}" id="star-${this.movieId}-${value}" value="${value}" ${checked} />
        <label for="star-${this.movieId}-${value}" data-value="${value}" aria-label="${value}점"
          style="background-image: url(${starSpriteImg})"></label>
      `;
    }).join("");

    const labelText = this.currentRating > 0 ? RATING_LABELS[this.currentRating] : "평가하기";
    const score = this.currentRating > 0 ? `<span class="rating-score">(${this.currentRating}/10)</span>` : "";
    return `<div class="star-list">${stars}</div><span class="rating-label">${labelText} ${score}</span>`;
  }

  private updateLabel(el: HTMLElement, rating: number): void {
    const labelText = rating > 0 ? RATING_LABELS[rating] : "평가하기";
    const score = rating > 0 ? `<span class="rating-score">(${rating}/10)</span>` : "";
    el.innerHTML = `${labelText} ${score}`;
  }

  private attach(): void {
    const starList = this.container.querySelector(".star-list") as HTMLElement;
    const ratingLabel = this.container.querySelector(".rating-label") as HTMLElement;

    starList.addEventListener("change", async (e) => {
      const input = e.target as HTMLInputElement;
      this.currentRating = Number(input.value);
      await this.repository.save(this.movieId, this.currentRating);
      this.updateLabel(ratingLabel, this.currentRating);
    });
  }
}
