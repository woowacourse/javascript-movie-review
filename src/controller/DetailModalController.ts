import { getMovieDetailResult } from "../api/getMovieDetailResult";
import DetailModal from "../component/DetailModal";
import { IMovieDetail } from "../types/movieResultType";
import { $, $all } from "../util/selector";

const calculateScore = (index: number) => index * 2 + 2;

const getRatingText = (score: number) => {
  if (score >= 10) return "명작이에요";
  if (score >= 8) return "재밌어요";
  if (score >= 6) return "볼만해요";
  if (score >= 4) return "그저 그래요";
  return "별로에요";
};

class DetailModalController {
  wrapElement;
  detailModalElement: HTMLElement | null = null;

  onErrorModalOpen;

  constructor({ onErrorModalOpen }: { onErrorModalOpen: (error: Error) => void }) {
    this.wrapElement = $("#wrap");

    this.onErrorModalOpen = onErrorModalOpen;
  }

  bindEvents() {
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
      const ratingScore = $(".modal-star-score", this.detailModalElement);

      starButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
          // 별 이미지 업데이트
          starButtons.forEach((btn, i) => {
            const img = btn as HTMLImageElement;
            img.src = i <= index ? "./images/star_filled.png" : "./images/star_empty.png";
          });

          // 텍스트 업데이트
          if (ratingText && ratingScore) {
            const score = calculateScore(index);
            const text = getRatingText(score);

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
      const movieDetail: IMovieDetail = await getMovieDetailResult(movieId);
      this.detailModalElement = DetailModal(movieDetail);
      this.wrapElement?.insertAdjacentElement("afterend", this.detailModalElement);
      this.bindEvents();
    } catch (error) {
      this.onErrorModalOpen(error as Error);
    }
  }

  closeModal() {
    if (this.detailModalElement) this.detailModalElement.remove();
  }
}
export default DetailModalController;
