import { ORIGINAL_IMAGE } from "../constants/api";
import NO_IMAGE from "../../public/images/no-image.png";

class ModalView {
  #movieListContainer;
  #modalBackground;
  #closeModal;
  #modalImage;
  #modalDescriptionTitle;
  #modalDescriptionYear ;
  #modalDescriptionGenre;
  #modalRateNumber;
  #modalDetailDescription;
  #modalContainer;
  #modalErrorContainer;
  #retryButton;
  #spinner;

  constructor() {
    this.#movieListContainer = document.querySelector<HTMLElement>(".thumbnail-list");
    this.#modalBackground = document.querySelector<HTMLElement>(".modal-background");
    this.#closeModal = document.querySelector<HTMLButtonElement>(".close-modal");
    this.#modalImage = document.querySelector<HTMLImageElement>("#modal-image");
    this.#modalDescriptionTitle = document.querySelector<HTMLTitleElement>(".modal-description-title");
    this.#modalDescriptionYear = document.querySelector<HTMLTitleElement>("#modal-description-year");
    this.#modalDescriptionGenre = document.querySelector<HTMLTitleElement>("#modal-description-genre");
    this.#modalRateNumber = document.querySelector<HTMLTitleElement>("#modal-rate-number");
    this.#modalDetailDescription = document.querySelector<HTMLParagraphElement>("#modal-detail-description");
    this.#modalContainer = document.querySelector<HTMLDivElement>(".modal-container");
    this.#modalErrorContainer = document.querySelector<HTMLDivElement>(".modal-error-container");
    this.#retryButton = document.querySelector<HTMLButtonElement>(".retry-button");
    this.#spinner = document.querySelector<HTMLDivElement>(".spinner");
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

  renderSpinner() {
    this.#modalContainer?.classList.add("hidden");
    this.#spinner?.classList.remove("hidden");
    this.#modalErrorContainer?.classList.add("hidden");
  };

  removeSpinner() {
    this.#spinner?.classList.add("hidden");
  };

  renderMovieDetail(data: MovieModalData) {
    this.#modalContainer?.classList.remove("hidden");

    if (this.#modalImage) {
      this.#modalImage.src = data.poster_path ? `${ORIGINAL_IMAGE}${data.poster_path}` : `${NO_IMAGE}`;
    };
  
    if (this.#modalDescriptionTitle) {
      this.#modalDescriptionTitle.textContent = data.title ? `${data.title}` : "알 수 없음";
    };

    if (this.#modalDescriptionYear) {
      this.#modalDescriptionYear.textContent = data.release_date ? `${data.release_date.split("-")[0]}` : "알 수 없음";
    };

    if (this.#modalDescriptionGenre) {
      this.#modalDescriptionGenre.textContent = data.genres
        ? data.genres.map((item) => item.name).join(", ")
        : "알 수 없음";
    };

    if (this.#modalRateNumber) {
      this.#modalRateNumber.textContent = data.vote_average ? `${data.vote_average.toFixed(1)}` : "알 수 없음";
    }

    if (this.#modalDetailDescription) {
      this.#modalDetailDescription.textContent = data.overview ? `${data.overview}` : "알 수 없음";
    };
  };

  openModal() {
    this.#modalBackground?.classList.add("active");
  };

  closeModal() {
    this.#modalBackground?.classList.remove("active");
  };

  renderError() {
    this.#modalContainer?.classList.add("hidden");
    this.#modalErrorContainer?.classList.remove("hidden");
  };

  bindRetryClick(handler: () => void) {
    this.#retryButton?.addEventListener("click", () => {
      handler();
    });
  };
}

export const modalView = new ModalView();
