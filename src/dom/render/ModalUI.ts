import { getMovieDetail, MovieDetail } from "../../apis/movie/api";
import { getErrorMessage } from "../../utils/getErrorMessage";

type ModalState =
  | { type: "loading" }
  | { type: "data"; movie: MovieDetail }
  | { type: "error"; message: string };

class ModalUI {
  modalState: ModalState = { type: "loading" };
  modalBackground = document.getElementById("modalBackground");
  modalCloseButton = document.getElementById("closeModal");
  modalImage = document.querySelector<HTMLImageElement>("#modal-image img");
  modalTitle = document.getElementById("modal-title");
  modalCategory = document.getElementById("modal-category");
  modalRate = document.getElementById("modal-rate");
  modalDetail = document.getElementById("modal-detail");
  modalErrorContainer = document.getElementById("modal-error-container"); // TODO 요소 추가

  constructor() {
    this.hide();
    this.modalCloseButton?.addEventListener("click", () => {
      this.hide();
    });
    this.modalBackground?.addEventListener("click", (e) => {
      if (e.target === this.modalBackground) this.hide();
    });
  }

  #setModalState(modalState: ModalState) {
    this.modalState = modalState;
    this.#render();
  }

  hide() {
    this.modalBackground?.classList.add("hidden");
  }

  async load(movieId: number) {
    this.#setModalState({ type: "loading" });
    this.modalBackground?.classList.remove("hidden");
    try {
      const movie = await getMovieDetail(movieId);
      this.#setModalState({ type: "data", movie });
    } catch (error) {
      this.#setModalState({ type: "error", message: getErrorMessage(error) });
    }
  }

  #render() {
    if (this.modalState.type === "loading") {
      // 스켈레톤
      return;
    }

    if (this.modalState.type === "error") {
      if (this.modalDetail)
        this.modalDetail.innerText = this.modalState.message;
      return;
    }

    if (this.modalState.type === "data") {
      const { movie } = this.modalState;
      const year = movie.release_date.slice(0, 4);
      const genres = movie.genres.map((g) => g.name).join(", ");

      if (this.modalImage)
        this.modalImage.src = `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`;
      if (this.modalTitle) this.modalTitle.innerText = movie.title;
      if (this.modalCategory)
        this.modalCategory.innerText = `${year} · ${genres}`;
      if (this.modalRate)
        this.modalRate.innerText = String(movie.vote_average.toFixed(1));
      if (this.modalDetail) this.modalDetail.innerText = movie.overview;
    }
  }
}

export default ModalUI;
