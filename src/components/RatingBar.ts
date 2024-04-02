import { movieRatingsStore } from "../stores/movieRatingsStore";
import { $, $$ } from "../utils/dom";
import { HTMLTemplate } from "./abstract/BaseComponent";

const RATING_STAR_COUNT = 5;

const RATING_TO_TEXT = {
  2: "2점 최악이에요",
  4: "4점 별로예요",
  6: "6점 보통이에요",
  8: "8점 재미있어요",
  10: "10점 명작이에요",
  none: "별을 눌러 평가해주세요!",
} as const;

const generateRatingStarsTemplate = (count: number, fillCount: number = 0) => {
  return Array.from({ length: count }).map((_, index) => {
    const starIndex = index + 1;
    const isChecked = starIndex <= fillCount;

    return `
      <input class="rating-checkbox" type="checkbox" id="rating-star-${starIndex}" value="${
      starIndex * 2
    }" ${isChecked ? "checked" : ""} />
      <label class="rating-start-label" for="rating-star-${starIndex}"></label>
      `;
  });
};

export default class RatingBar extends HTMLElement {
  static observedAttributes = ["movieId"];

  connectedCallback() {
    this.render();
    this.setEvent();
  }

  private render() {
    this.innerHTML = this.getTemplate();
  }

  private getTemplate(): HTMLTemplate {
    const rating = this.getMyRating();
    const starFillCount = this.calculateStarFillCount(rating);
    const ratingText = this.convertIntoRatingText(rating);

    return `
    <div class="rating-bar">
      <p class="rating-label">내 별점</p>
      <div id="rating-star-container" class="rating-star-container">
        ${generateRatingStarsTemplate(RATING_STAR_COUNT, starFillCount).join(
          ""
        )}
      </div>
      <p id="rating-text" class="rating-text">${ratingText}</p>
    </div>
    `;
  }

  private setEvent(): void {
    $<HTMLDivElement>("rating-star-container")?.addEventListener(
      "click",
      this.handleRatingStarClick.bind(this)
    );
  }

  handleRatingStarClick(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.classList.contains("rating-checkbox")) {
      const rating = parseInt(target.value);
      this.updateRatingStar(rating);
      this.updateRatingText(rating);
      this.updateMovieRatingsStore(rating);
    }
  }

  private getMyRating(): number | null {
    const movieId = Number(this.getAttribute("movieId"));

    const movieRatings = movieRatingsStore.get();
    return movieRatings.findRating(movieId);
  }

  private updateRatingStar(rating: number): void {
    $$<HTMLInputElement>(".rating-checkbox").forEach((star, index) => {
      const isChecked = index < rating / 2;
      star.checked = isChecked;
    });
  }

  private updateRatingText(rating: number): void {
    $("rating-text")!.textContent = this.convertIntoRatingText(rating);
  }

  private convertIntoRatingText(rating: number | null): string {
    if (rating === null) {
      return RATING_TO_TEXT.none;
    }

    return RATING_TO_TEXT[rating as keyof typeof RATING_TO_TEXT];
  }

  private calculateStarFillCount(rating: number | null): number {
    return rating ? rating / 2 : 0;
  }

  private updateMovieRatingsStore(rating: number) {
    const movieId = Number(this.getAttribute("movieId"));

    const movieRatings = movieRatingsStore.get();
    movieRatings.put({ movieId, rating });
    movieRatingsStore.set(movieRatings);
  }
}
