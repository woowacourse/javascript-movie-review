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
  id: number;
};

class MovieDetailModal {
  #parentElement;

  private static readonly IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p/original";

  constructor(parentElement: HTMLElement) {
    this.#parentElement = parentElement;
  }

  show(id: number) {
    this.#renderInitial();
    this.#fetchAndRenderModal(id);
  }

  async #fetchAndRenderModal(id: number) {
    try {
      const details = await MovieApi.fetchMovieDetail(id);

      this.#render(details);
      this.#renderStarRate(details.id);
      this.#addEventListeners();
    } catch (e) {
      //에러 처리
      const $modalContainer = document.querySelector(".modal-container");
      if (!isHTMLElement($modalContainer)) return;

      $modalContainer.innerHTML = /*html*/ `
        <div class="modal-error">
          <img src="./images/dizzy_planet.png" alt="error" />
          <p>영화 정보를 불러오지 못했습니다.</p>
          <button class="retry-button" id="retryButton">다시 시도</button>
        </div>`;

      const $retryButton = document.querySelector("#retryButton");
      if (!isHTMLElement($retryButton)) return;

      $retryButton.addEventListener("click", () => {
        this.#fetchAndRenderModal(id);
      });
    }
  }

  #renderInitial() {
    const $modalBackground = document.querySelector(".modal-background");
    const $body = document.querySelector("body");
    if (!isHTMLElement($modalBackground) || !isHTMLElement($body)) return;

    this.#parentElement.innerHTML = Skeleton.MovieDetailModal;
    $modalBackground.classList.add("active");
    $body.classList.add("active");
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
      ? `${MovieDetailModal.IMAGE_BASE_URL}${poster_path}`
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
export default MovieDetailModal;
