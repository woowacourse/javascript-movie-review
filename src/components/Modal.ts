import MovieApi from "../api/MovieApi";
import { Movie } from "../types/movie";
import { isHTMLElement } from "../utils/typeGuards";
import MyRate from "./MyRate";
import Skeleton from "./Skeleton";

type MovieDetail = {
  poster_path: string;
  title: string;
  genres: { id: number; name: string }[];
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
    this.#renderStarRate(details.id);
    this.#addEventListeners();
  }

  #renderInitial() {
    this.#parentElement.innerHTML = Skeleton.Modal;
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
            ${details.genres.map(({ name }) => name).join(", ")}
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

  #renderStarRate(id: number) {
    const $stars = document.querySelector(".my-rate");
    if (!isHTMLElement($stars)) return;
    new MyRate($stars, id);
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
    const $body = document.querySelector("body");
    if (!isHTMLElement($modalBackground) || !isHTMLElement($body)) return;
    $modalBackground.classList.remove("active");
    document.removeEventListener("keydown", this.#keyDownHandler);
    $body.classList.remove("active");
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
