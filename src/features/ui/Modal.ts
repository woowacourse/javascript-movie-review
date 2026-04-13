import { MovieDetail } from "../../../types/types";
import { POSTER_URL } from "../../constants/image";
import closeButtonImg from "../../images/modal_button_close.png";
import starImg from "../../images/star_filled.png";
import { eventBus } from "../../pubsub/EventBus";
import { APP_EVENTS } from "../../pubsub/AppEvents";
import { StarRating } from "./StarRating";
import { IRatingRepository } from "../rating/IRatingRepository";
import { LocalStorageRatingRepository } from "../rating/LocalStorageRatingRepository";

export class Modal {
  private dialog: HTMLDialogElement;

  constructor(private ratingRepository: IRatingRepository) {
    this.dialog = document.querySelector(".modal") as HTMLDialogElement;
    this.dialog.addEventListener("close", () => {
      eventBus.publish(APP_EVENTS.MODAL_CLOSED, undefined);
    });
  }

  openWithLoading(): void {
    this.dialog.innerHTML = this.renderLoading();
    this.dialog.showModal();
  }

  fill(movie: MovieDetail): void {
    this.dialog.innerHTML = this.render(movie);

    const closeButton = this.dialog.querySelector(".close-modal") as HTMLElement;
    closeButton.focus();
    closeButton.addEventListener("click", () => this.dialog.close());

    const starRatingContainer = this.dialog.querySelector(".star-rating") as HTMLElement;
    new StarRating(starRatingContainer, movie.id, this.ratingRepository).mount();
  }

  private renderLoading(): string {
    return `
      <button class="close-modal">
        <img src="${closeButtonImg}" alt="닫기" />
      </button>
      <div class="modal-loading">
        <div class="spinner"></div>
      </div>
    `;
  }

  private render(movie: MovieDetail): string {
    const year = movie.release_date.slice(0, 4);
    const genres = movie.genres.map((g) => g.name).join(", ");
    const poster = movie.poster_path ? `${POSTER_URL}${movie.poster_path}` : "";

    return `
      <button class="close-modal">
        <img src="${closeButtonImg}" alt="닫기" />
      </button>
      <div class="modal-container">
        <div class="modal-image">
          <img src="${poster}" alt="${movie.title}" />
        </div>
        <div class="modal-description">
          <h2>${movie.title}</h2>
          <p class="subtitle">${year} · ${genres}</p>
          <div class="rate">
            <span>평균</span>
            <span class="rate-score">
              <img src="${starImg}" alt="별점" />
              <span>${(movie.vote_average ?? 0).toFixed(1)}</span>
            </span>
          </div>
          <hr class="modal-divider" />
          <p class="section-label">내 별점</p>
          <div class="star-rating"></div>
          <hr class="modal-divider" />
          <p class="section-label">줄거리</p>
          <p class="detail">${movie.overview}</p>
        </div>
      </div>
    `;
  }
}

export const modal = new Modal(new LocalStorageRatingRepository());
