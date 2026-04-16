import { MovieDetail } from "../../types/movie";
import { BASE_URL, IMAGE_URL } from "../constants/constant";
import { RatingScore } from "../rating/validateScore";
import { StarRating } from "./StarRating";
export interface MovieDetailModalElements {
  background: HTMLDivElement;
  closeButton: HTMLButtonElement;
  poster: HTMLImageElement;
  title: HTMLHeadingElement;
  category: HTMLParagraphElement;
  rateValue: HTMLSpanElement;
  detail: HTMLParagraphElement;
  myRatingStars: HTMLDivElement;
  myRatingLabel: HTMLParagraphElement;
}

export class MovieDetailModal {
  private currentMovieId: number = 0;
  private readonly starRating: StarRating;

  constructor(
    private readonly el: MovieDetailModalElements,
    private readonly onRate: (movieId: number, score: RatingScore) => void,
  ) {
    this.starRating = new StarRating(
      el.myRatingStars,
      el.myRatingLabel,
      (score) => this.onRate(this.currentMovieId, score),
    );

    el.closeButton.addEventListener("click", () => this.close());
    el.background.addEventListener("click", (e) => {
      if (e.target === el.background) this.close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen()) this.close();
    });
  }

  open(detail: MovieDetail, currentRating: RatingScore | null): void {
    this.currentMovieId = detail.id;

    this.el.poster.src = detail.thumbnail_path
      ? `${BASE_URL.MODAL_POSTER_BASE_URL}${detail.thumbnail_path}`
      : IMAGE_URL.DEFAULT_THUMBNAIL_IMAGE_URL;
    this.el.poster.alt = detail.title;
    this.el.title.textContent = detail.title;
    const categoryParts = [detail.releaseYear, detail.genres.join(", ")].filter(
      Boolean,
    );
    this.el.category.textContent = categoryParts.join(" · ");
    this.el.rateValue.textContent = `${detail.rate.toFixed(1)}`;
    this.el.detail.textContent = detail.overview;

    this.starRating.setScore(currentRating ?? 0);

    this.el.background.classList.add("active");
    document.body.classList.add("modal-open");
  }

  close(): void {
    this.el.background.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  private isOpen(): boolean {
    return this.el.background.classList.contains("active");
  }
}
