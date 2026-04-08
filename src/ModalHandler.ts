import { renderMovieDetail } from "./movieDetailRenderer";

class ModalHandler {
  modalArea = document.querySelector("#modalBackground");

  // 모달 닫는 핸들러
  handleModalCloseButtonClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest("#closeModal")) {
      document.querySelector(".modal-container")?.remove();
      this.modalArea?.classList.remove("active");
    }
  };

  handleModalCloseButtonKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      document.querySelector(".modal-container")?.remove();
      this.modalArea?.classList.remove("active");
    }
  };

  handleModalCloseBackdrop = (e: MouseEvent) => {
    if ((e.target as HTMLElement) === this.modalArea) {
      document.querySelector(".modal-container")?.remove();
      this.modalArea?.classList.remove("active");
    }
  };

  handleMovieClick = async (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest(".item")) {
      const movieId: number = Number(
        (e.target as HTMLElement).closest("[data-id]")?.getAttribute("data-id"),
      );
      document.querySelector(".modal-container")?.remove();
      await renderMovieDetail(movieId);
      this.showModal();
    }
  };

  private showModal() {
    this.modalArea?.classList.add("active");
  }
}

export default ModalHandler;
