import DetailModal from "../component/detailModal/DetailModal";
import { SCORE_RATING_TEXT } from "../constant/scoreRatingText";
import MovieDetailModel from "../domain/MovieDetailModel";
import { calculateScore } from "../domain/util/calculateScore";
import { $, $all } from "../util/selector";

class DetailModalController {
  movieDetailModel;
  wrapElement;
  detailModalElement: HTMLElement | null = null;

  onErrorModalOpen;

  constructor({ onErrorModalOpen }: { onErrorModalOpen: (error: Error) => void }) {
    this.movieDetailModel = MovieDetailModel();
    this.wrapElement = $("#wrap");

    this.onErrorModalOpen = onErrorModalOpen;
  }

  bindEvents(movieId: number) {
    if (this.detailModalElement) {
      this.detailModalElement.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) this.closeModal();
      });

      const closeButton = $("#closeModal", this.detailModalElement);
      closeButton?.addEventListener("click", () => this.closeModal());

      window.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          this.closeModal();
        }
      });

      const starButtons = $all(".modal-star-button", this.detailModalElement);
      const ratingText = $(".modal-star-text", this.detailModalElement);

      starButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
          const score = calculateScore(index);
          this.movieDetailModel.updateStarScore(movieId, score);

          // 별 이미지 업데이트
          starButtons.forEach((btn, i) => {
            const img = btn as HTMLImageElement;
            img.src = i <= index ? "./images/star_filled.png" : "./images/star_empty.png";
          });

          // 텍스트 업데이트
          if (ratingText) {
            const text = SCORE_RATING_TEXT[score];

            ratingText.textContent = text;
            const span = document.createElement("span");
            span.className = "modal-star-score";
            span.textContent = ` (${score}/10)`;
            ratingText.appendChild(span);
          }
        });
      });
    }
  }

  async showModal(movieId: number) {
    try {
      const movieDetail = await this.movieDetailModel.getMovieDetailById(movieId);
      this.detailModalElement = DetailModal(movieDetail);
      this.wrapElement?.insertAdjacentElement("afterend", this.detailModalElement);
      this.bindEvents(movieId);
    } catch (error) {
      this.onErrorModalOpen(error as Error);
    }
  }

  closeModal() {
    if (this.detailModalElement) this.detailModalElement.remove();
  }
}
export default DetailModalController;
