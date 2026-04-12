import { MovieDetail } from "../../../types/types";
import { POSTER_URL } from "../../constants/image";
import closeButtonImg from "../../images/modal_button_close.png";
import starImg from "../../images/star_filled.png";
import { eventBus } from "../../pubsub/EventBus";
import { APP_EVENTS } from "../../pubsub/AppEvents";

export class Modal {
  private dialog: HTMLDialogElement;

  constructor() {
    this.dialog = document.querySelector(".modal") as HTMLDialogElement;
    this.dialog.addEventListener("close", () => {
      eventBus.publish(APP_EVENTS.MODAL_CLOSED, undefined);
    });
  }

  open(movie: MovieDetail) {
    this.dialog.innerHTML = this.render(movie);
    this.dialog.showModal();

    const closeButton = this.dialog.querySelector(".close-modal") as HTMLElement;
    closeButton.focus();
    closeButton.addEventListener("click", () => this.dialog.close());
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
          <p>${year} · ${genres}</p>
          <p class="rate">
            <img src="${starImg}" alt="별점" />
            <span>${(movie.vote_average ?? 0).toFixed(1)}</span>
          </p>
          <p class="detail">${movie.overview}</p>
        </div>
      </div>
    `;
  }
}

export const modal = new Modal();
