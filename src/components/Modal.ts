import MovieApi from "../api/MovieApi";
import { Movie } from "../types/movie";
import { isHTMLElement } from "../utils/typeGuards";
import MyRate, { MyRateSkeleton } from "./MyRate";

type MovieDetail = {
  poster_path: string;
  title: string;
  genres: string;
  vote_average: number;
  overview: string;
};
class Modal {
  #parentElement;

  private static readonly IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p/original";
  // #props;

  constructor(parentElement: HTMLElement, id: number) {
    this.#parentElement = parentElement;
    this.#renderInitial();
    this.#fetchAndRenderModal(id);
  }

  async #fetchAndRenderModal(id: number) {
    const details = await MovieApi.fetchMovieDetail(id);
    this.#render(details);
    this.#renderStarRate();
    this.#addEventListeners();
  }

  #renderInitial() {
    this.#parentElement.innerHTML = /*html*/ `
    <div class="modal">
      <button class="close-modal" id="closeModal">
        <img src="./images/modal_button_close.png" />
      </button>
      <div class="modal-container">
        <div class="modal-image">
          <div class="modal-image-skeleton"></div>
        </div>
        <div class="modal-description">
          <h2>로딩중...</h2>
          <p class="category">
            로딩중...
          </p>
          <p class="rate">
            <img src="./images/star_filled.png" class="star" /><span
              >0.0</span
            >
          </p>
          <hr />
          <div class="my-rate">
            ${MyRateSkeleton()}
         </div>
          
          <hr />
          <p class="detail">
            로딩중...
          </p>
        </div>
      </div>
  </div>`;
  }

  #render(details: MovieDetail) {
    this.#parentElement.innerHTML = /*html*/ `
    <div class="modal">
      <button class="close-modal" id="closeModal">
        <img src="./images/modal_button_close.png" />
      </button>
      <div class="modal-container">
        <div class="modal-image">
          <img
            src=${this.#posterImage(details.poster_path)}
            alt=${details.title}
          />
        </div>
        <div class="modal-description">
          <h2>${details.title}</h2>
          <p class="category">
            ${details.genres}
          </p>
          <p class="rate">
            <img src="./images/star_filled.png" class="star" /><span
              >${details.vote_average}</span
            >
          </p>
          <hr />
          <div class="my-rate">
          
         </div>
          
          <hr />
          <p class="detail">
            ${details.overview}
          </p>
        </div>
      </div>
  </div>`;
  }

  #renderStarRate() {
    const $stars = document.querySelector(".my-rate");
    if (!isHTMLElement($stars)) return;
    new MyRate($stars);
  }

  #posterImage(poster_path: Movie["poster_path"]): string {
    return poster_path
      ? `${Modal.IMAGE_BASE_URL}${poster_path}`
      : "./images/null_image.png";
  }

  #addEventListeners() {
    const $closeModal = document.querySelector("#closeModal");
    const $modalBackground = document.querySelector(".modal-background");
    if (!isHTMLElement($closeModal) || !isHTMLElement($modalBackground)) return;

    $closeModal.addEventListener("click", () => {
      this.#closeModal();
    });

    $modalBackground.addEventListener("click", (e) => {
      if (e.target === $modalBackground) {
        this.#closeModal();
      }
    });

    document.addEventListener("keydown", this.#keyDownHandler);
  }

  #closeModal() {
    const $modalBackground = document.querySelector(".modal-background");
    if (!isHTMLElement($modalBackground)) return;
    $modalBackground.classList.remove("active");
    document.removeEventListener("keydown", this.#keyDownHandler);
  }

  #keyDownHandler = (e: KeyboardEvent) => {
    const $modalBackground = document.querySelector(".modal-background");
    if (!isHTMLElement($modalBackground)) return;

    if (e.key === "Escape") {
      $modalBackground.classList.remove("active");
      document.removeEventListener("keydown", this.#keyDownHandler);
    }
  };
}
export default Modal;
