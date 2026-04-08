class ModalView {
  #movieListContainer;

  constructor() {
    this.#movieListContainer = document.querySelector<HTMLElement>(".thumbnail-list");
  };

  bindMovieClick(handler: (clickedMovieId: string) => void) {
    this.#movieListContainer?.addEventListener("click", (e) => {
      if (e.target instanceof Element) {
        const movieCard = e.target.closest(".movie");
        if (movieCard) handler(movieCard.id);
      };
    });
  };

}

export const modalView = new ModalView();
