import DetailLoadingModal from "../component/detailModal/DetailLoadingModal";
import DetailModal from "../component/detailModal/DetailModal";
import { SCORE_RATING_TEXT } from "../constant/scoreRatingText";
import { calculateScore } from "../domain/util/calculateScore";
import { $, $all } from "../util/selector";
import { IMovieDetail } from "../types/movieResultType";

class DetailModalView {
  #element: HTMLElement | null;
  #wrapElement;

  constructor() {
    this.#element = null;
    this.#wrapElement = $("#wrap");
  }

  renderLoading() {
    this.#element = DetailLoadingModal();
    this.#wrapElement?.insertAdjacentElement("afterend", this.#element);
  }

  renderDetailModalWhenReady(movieDetail: IMovieDetail, onDetailReady: () => void) {
    const fullModal = DetailModal(movieDetail, () => {
      this.#element?.replaceWith(fullModal);
      this.#element = fullModal;
      onDetailReady();
    });
  }

  bindCloseEvents(onClose: () => void) {
    if (this.#element) {
      this.#element.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) onClose();
      });

      const closeBtn = $("#closeModal", this.#element);
      closeBtn?.addEventListener("click", onClose);

      window.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      });
    }
  }

  bindStarEvents(movieId: number, updateScore: (id: number, score: number) => void) {
    if (this.#element) {
      const starButtons = $all(".modal-star-button", this.#element);
      const ratingText = $(".modal-star-text", this.#element);

      starButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
          const score = calculateScore(index);
          updateScore(movieId, score);

          starButtons.forEach((btn, i) => {
            const img = btn as HTMLImageElement;
            img.src = i <= index ? "./images/star_filled.png" : "./images/star_empty.png";
          });

          if (ratingText) {
            ratingText.textContent = SCORE_RATING_TEXT[score];
            const span = document.createElement("span");
            span.className = "modal-star-score";
            span.textContent = ` (${score}/10)`;
            ratingText.appendChild(span);
          }
        });
      });
    }
  }

  remove() {
    this.#element?.remove();
  }
}

export default DetailModalView;
