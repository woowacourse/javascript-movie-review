import { renderMovieDetail } from "./movieDetailRenderer";
import { RatingStorage } from "./storage/RatingStorage";

class ModalHandler {
  constructor(private storage: RatingStorage) {}

  modalArea = document.querySelector("#modalBackground");

  init() {
    document.addEventListener("click", this.handleMovieClick);
    document.addEventListener("click", this.handleModalCloseButtonClick);
    document.addEventListener("click", this.handleModalCloseBackdrop);
    document.addEventListener("keydown", this.handleModalCloseButtonKeyDown);
  }

  // 모달 닫는 핸들러
  handleModalCloseButtonClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest("#closeModal")) {
      document.querySelector(".modal-container")?.remove();
      this.hideModal();
    }
  };

  handleModalCloseButtonKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      document.querySelector(".modal-container")?.remove();
      this.hideModal();
    }
  };

  handleModalCloseBackdrop = (e: MouseEvent) => {
    if ((e.target as HTMLElement) === this.modalArea) {
      document.querySelector(".modal-container")?.remove();
      this.hideModal();
    }
  };

  handleMovieClick = async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(".item") || target.closest(".primary.detail")) {
      const movieId: number = Number(
        target.closest("[data-id]")?.getAttribute("data-id"),
      );
      document.querySelector(".modal-container")?.remove();
      await renderMovieDetail(movieId, this.storage);
      this.showModal();
    }
  };

  private showModal() {
    this.modalArea?.classList.add("active");
  }

  private hideModal() {
    document.querySelector(".modal-container")?.remove();
    this.modalArea?.classList.remove("active");
  }
}

export default ModalHandler;
