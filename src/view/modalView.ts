class ModalView {
  #movieListContainer;
  #modalContainer;
  #closeModal;

  constructor() {
    this.#movieListContainer = document.querySelector<HTMLElement>(".thumbnail-list");
    this.#modalContainer = document.querySelector<HTMLElement>(".modal-background");
    this.#closeModal = document.querySelector<HTMLButtonElement>(".close-modal");
  };

  bindMovieClick(handler: (clickedMovieId: string) => void) {
    this.#movieListContainer?.addEventListener("click", (e) => {
      if (e.target instanceof Element) {
        const movieCard = e.target.closest(".movie");
        if (movieCard) {
          this.openModal();
          handler(movieCard.id);
        }
      };
    });
  };

  bindCloseModalClick() {
    this.#closeModal?.addEventListener("click", () => {
      this.closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeModal();
    });
  };

  openModal() {
    this.#modalContainer?.classList.add("active");
  };

  closeModal() {
    this.#modalContainer?.classList.remove("active");
  };
}

export const modalView = new ModalView();
