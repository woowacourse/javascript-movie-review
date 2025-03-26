import { Movie } from "../types/movie";
import { isHTMLElement } from "../utils/typeGuards";
import MyRate from "./MyRate";

class Modal {
  #parentElement;
  #movie;
  private static readonly IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p/original";
  // #props;

  constructor(parentElement: HTMLElement, movie: Movie) {
    this.#parentElement = parentElement;
    this.#movie = movie;
    console.log(this.#movie);
    this.#render();
    this.#renderStarRate();
    this.#addEventListeners();
  }

  #render() {
    this.#parentElement.innerHTML = /*html*/ `
    <div class="modal">
      <button class="close-modal" id="closeModal">
        <img src="./images/modal_button_close.png" />
      </button>
      <div class="modal-container">
        <div class="modal-image">
          <img
            src=${this.#posterImage(this.#movie.poster_path)}
            alt=${this.#movie.title}
          />
        </div>
        <div class="modal-description">
          <h2>${this.#movie.title}</h2>
          <p class="category">
            ${this.#movie.genre_ids?.map((genre) => genre).join(", ")}
          </p>
          <p class="rate">
            <img src="./images/star_filled.png" class="star" /><span
              >${this.#movie.vote_average}</span
            >
          </p>
          <hr />
          <div class="my-rate">
         </div>
          
          <hr />
          <p class="detail">
            ${this.#movie.overview}
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
      $modalBackground.classList.remove("active");
    });
  }
}
export default Modal;
