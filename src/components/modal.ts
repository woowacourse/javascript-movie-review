import closeIconSrc from "../../templates/images/modal_button_close.png";
import starFilledSrc from "../../templates/images/star_filled.png";
import starEmptySrc from "../../templates/images/star_empty.png";
import { MovieDetail } from "../api/types";
import { MovieService } from "../services/movie/MovieService";
import { RatingService } from "../services/rating/RatingService";

const RATING_LABELS: Record<number, string> = {
  2: "최악이에요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};

export class Modal {
  element: HTMLDialogElement;

  private movieService: MovieService;
  private ratingService: RatingService;
  private currentMovieId: number | null = null;

  private posterImg!: HTMLImageElement;
  private titleEl!: HTMLHeadingElement;
  private categoryEl!: HTMLParagraphElement;
  private avgRatingEl!: HTMLSpanElement;
  private myRatingStars!: HTMLDivElement[];
  private myRatingLabelEl!: HTMLSpanElement;
  private myRatingScoreEl!: HTMLSpanElement;
  private overviewEl!: HTMLParagraphElement;

  constructor() {
    this.movieService = new MovieService();
    this.ratingService = new RatingService();
    this.element = this.buildDialog();

    this.movieService.subscribe(({ isPending, detail, error }) => {
      if (isPending) {
        this.showSkeleton();
        return;
      }
      if (error) {
        this.showError();
        return;
      }
      if (detail) {
        this.update(detail);
      }
    });
  }

  open(id: number): void {
    this.currentMovieId = id;
    this.element.showModal();
    this.updateMyRating(this.ratingService.get(id));
    this.movieService.load(id);
  }

  close(): void {
    this.element.close();
  }

  private showSkeleton(): void {
    this.titleEl.textContent = "\u00A0";
    this.categoryEl.textContent = "\u00A0";
    this.avgRatingEl.textContent = "\u00A0";
    this.overviewEl.textContent = "\u00A0";
    this.posterImg.src = "";
    this.setSkeletonMode(true);
  }

  private showError(): void {
    this.setSkeletonMode(false);
    this.titleEl.textContent = "오류가 발생했습니다";
    this.categoryEl.textContent = "";
    this.avgRatingEl.textContent = "-";
    this.overviewEl.textContent = "영화 정보를 불러오지 못했습니다.";
  }

  private update(content: MovieDetail): void {
    this.setSkeletonMode(false);
    this.titleEl.textContent = content.title;
    this.categoryEl.textContent = `${content.releaseYear} · ${content.genres}`;
    this.avgRatingEl.textContent = String(content.rating);
    this.overviewEl.textContent = content.overview;
    this.posterImg.src = content.posterSrc;
    this.posterImg.alt = `poster of ${content.title}`;
  }

  private setSkeletonMode(active: boolean): void {
    [this.titleEl, this.categoryEl, this.avgRatingEl, this.overviewEl].forEach(
      (el) => el.classList.toggle("skeleton-box", active),
    );
    this.posterImg.classList.toggle("skeleton-box", active);
    this.posterImg.style.opacity = active ? "0" : "";
  }

  private updateMyRating(rating: number | null): void {
    this.updateStars(rating);
    this.updateRatingLabel(rating);
  }

  private updateStars(rating: number | null): void {
    this.myRatingStars.forEach((star, i) => {
      const score = (i + 1) * 2;
      const isFilled = rating !== null && score <= rating;
      star.classList.toggle("filled", isFilled);
    });
  }

  private updateRatingLabel(rating: number | null): void {
    if (rating === null) {
      this.myRatingLabelEl.textContent = "\u00A0";
      this.myRatingScoreEl.textContent = "";
      return;
    }

    this.myRatingLabelEl.textContent = RATING_LABELS[rating] ?? "";
    this.myRatingScoreEl.textContent = `(${rating}/10)`;
  }

  private buildDialog(): HTMLDialogElement {
    this.buildContentElements();
    const rateEl = this.buildRateElement();
    const myRatingEl = this.buildMyRatingElement();
    const overviewEl = this.buildOverviewElement();
    const modalDesc = this.buildModalDesc(rateEl, myRatingEl, overviewEl);

    const dialog = document.createElement("dialog");
    dialog.className = "modal";
    dialog.append(
      createCloseButton(() => this.close()),
      createModalContainer(this.posterImg, modalDesc),
    );
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) this.close();
    });

    return dialog;
  }

  private buildModalDesc(
    rateEl: HTMLParagraphElement,
    myRatingEl: HTMLDivElement,
    overviewEl: HTMLDivElement,
  ): HTMLDivElement {
    const modalDesc = document.createElement("div");
    modalDesc.className = "modal-description";
    modalDesc.append(
      this.titleEl,
      this.categoryEl,
      rateEl,
      myRatingEl,
      overviewEl,
    );
    return modalDesc;
  }

  private buildContentElements(): void {
    this.posterImg = document.createElement("img");
    this.titleEl = document.createElement("h2");
    this.categoryEl = document.createElement("p");
    this.categoryEl.className = "category";
  }

  private buildRateElement(): HTMLParagraphElement {
    this.avgRatingEl = document.createElement("span");
    this.avgRatingEl.className = "rate-value";

    const rateEl = document.createElement("p");
    rateEl.className = "rate";

    const label = document.createElement("span");
    label.className = "rate-label";
    label.textContent = "평균";

    const starImg = document.createElement("img");
    starImg.src = starFilledSrc;
    starImg.className = "rate-star";

    rateEl.append(label, starImg, this.avgRatingEl);
    return rateEl;
  }

  private buildMyRatingElement(): HTMLDivElement {
    const starsWrapper = this.buildStarsWrapper();
    const ratingDesc = this.buildRatingDesc();

    const starsRow = document.createElement("div");
    starsRow.className = "my-rating-row";
    starsRow.append(starsWrapper, ratingDesc);

    const title = document.createElement("h3");
    title.className = "my-rating-label";
    title.textContent = "내 별점";

    const wrapper = document.createElement("div");
    wrapper.className = "my-rating";
    wrapper.append(title, starsRow);
    return wrapper;
  }

  private buildStarsWrapper(): HTMLDivElement {
    const starsWrapper = document.createElement("div");
    starsWrapper.className = "my-rating-stars";

    this.myRatingStars = Array.from({ length: 5 }, (_) => {
      const starEl = document.createElement("div");
      starEl.className = "my-rating-star";

      const emptyImg = document.createElement("img");
      emptyImg.src = starEmptySrc;
      emptyImg.className = "star-empty";

      const filledImg = document.createElement("img");
      filledImg.src = starFilledSrc;
      filledImg.className = "star-filled";

      starEl.append(emptyImg, filledImg);
      starsWrapper.appendChild(starEl);
      return starEl;
    });

    this.bindStarEvents();
    return starsWrapper;
  }

  private bindStarEvents(): void {
    this.myRatingStars.forEach((starEl, i) => {
      const score = (i + 1) * 2;

      starEl.addEventListener("mouseenter", () => this.updateMyRating(score));
      starEl.addEventListener("mouseleave", () =>
        this.updateMyRating(
          this.currentMovieId !== null
            ? this.ratingService.get(this.currentMovieId)
            : null,
        ),
      );
      starEl.addEventListener("click", () => {
        if (this.currentMovieId === null) return;
        this.ratingService.set(this.currentMovieId, score);
        this.updateMyRating(score);
      });
    });
  }

  private buildRatingDesc(): HTMLDivElement {
    this.myRatingLabelEl = document.createElement("span");
    this.myRatingLabelEl.className = "my-rating-text";
    this.myRatingLabelEl.textContent = "\u00A0";

    this.myRatingScoreEl = document.createElement("span");
    this.myRatingScoreEl.className = "my-rating-score";

    const ratingDesc = document.createElement("div");
    ratingDesc.className = "my-rating-desc";
    ratingDesc.append(this.myRatingLabelEl, this.myRatingScoreEl);
    return ratingDesc;
  }

  private buildOverviewElement(): HTMLDivElement {
    const overviewLabel = document.createElement("h3");
    overviewLabel.className = "overview-label";
    overviewLabel.textContent = "줄거리";

    this.overviewEl = document.createElement("p");
    this.overviewEl.className = "overview";

    const wrapper = document.createElement("div");
    wrapper.append(overviewLabel, this.overviewEl);
    return wrapper;
  }
}

function createCloseButton(onClick: () => void): HTMLButtonElement {
  const closeBtn = document.createElement("button");
  closeBtn.className = "close-modal";
  const closeImg = document.createElement("img");
  closeImg.src = closeIconSrc;
  closeBtn.appendChild(closeImg);
  closeBtn.addEventListener("click", onClick);
  return closeBtn;
}

function createModalContainer(
  posterImg: HTMLImageElement,
  descElement: HTMLDivElement,
): HTMLDivElement {
  const container = document.createElement("div");
  container.className = "modal-container";

  const modalImage = document.createElement("div");
  modalImage.className = "modal-image";
  modalImage.append(posterImg);

  container.append(modalImage, descElement);
  return container;
}
