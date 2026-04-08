class ModalView {
  #movieListContainer;
  #modalContainer;

  constructor() {
    this.#movieListContainer = document.querySelector<HTMLElement>(".thumbnail-list");
    this.#modalContainer = document.querySelector<HTMLElement>(".modal-background");
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

  openModal() {
    this.#modalContainer?.classList.add("active");
  };
}

export const modalView = new ModalView();
