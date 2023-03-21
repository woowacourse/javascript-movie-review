import type { Movie } from "../types/type";
import { $ } from "../utils/dom";

class MovieDetailModal extends HTMLElement {
  constructor() {
    super();
  }

  render(movie: Movie) {
    const { title } = movie;
    this.innerHTML = /* html */ `
      <section class="modal">
        <div class="modal-backdrop item-sheet-backdrop"></div>
        <div class="modal-header">
          <span class="modal-title">${title}</span>
          <button class="modal-close-button">
            <span class="close">X</span>
          </button>
        </div>
        
      </section>
    `;
    this.addEvent();
  }

  addEvent() {
    $(".modal-close-button")?.addEventListener("click", () => {
      this.remove();
    });
  }
}

interface MovieDetailModal {
  "movie-detail-modal": typeof MovieDetailModal;
}

customElements.define("movie-detail-modal", MovieDetailModal);

export default MovieDetailModal;
