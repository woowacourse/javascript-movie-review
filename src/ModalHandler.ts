class ModalHandler {
  modalArea = document.querySelector("#modalBackground");

  // 모달 닫는 핸들러
  handleModalCloseButtonClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest("#closeModal")) {
      this.modalArea?.classList.remove("active");
    }
  };

  handleModalCloseButtonKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      this.modalArea?.classList.remove("active");
    }
  };

  handleModalCloseBackdrop = (e: MouseEvent) => {
    if ((e.target as HTMLElement) === this.modalArea) {
      this.modalArea?.classList.remove("active");
    }
  };

  handleMovieClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest(".item")) {
      this.showModal();
    }
  };

  private showModal() {
    this.modalArea?.classList.add("active");
  }
}

export default ModalHandler;
