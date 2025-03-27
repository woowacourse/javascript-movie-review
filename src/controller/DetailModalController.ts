import { getMovieDetailResult } from "../api/getMovieDetailResult";
import DetailModal from "../component/DetailModal";
import { IMovieDetail } from "../types/movieResultType";
import { $ } from "../util/selector";

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
