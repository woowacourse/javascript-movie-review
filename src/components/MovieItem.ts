import { Movie } from "../types/movie";
import { isHTMLElement } from "../utils/typeGuards";
import MovieDetailModal from "./MovieDetailModal";

class MovieItem {
  #parentElement;
  #movie;
  private static readonly IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p/original";

  constructor(
    parentElement: HTMLElement,
    movie: Movie,
    modal: MovieDetailModal
  ) {
    this.#parentElement = parentElement;
    this.#movie = movie;
    this.#render();
    this.#addEventListeners(modal);
  }

  #render() {
    this.#parentElement.innerHTML = /*html*/ `<div class="item">
    <img class="thumbnail" src="${this.#posterImage(
      this.#movie.poster_path
    )}" alt="${this.#movie.title}" />
    <div class="item-desc">
      <p class="rate">
        <img src="./images/star_empty.png" class="star" alt="star-empty"/>
        <span>${this.#movie.vote_average}</span>
      </p>
      <strong>${this.#movie.title}</strong>
    </div>
  </div>`;
  }

  #posterImage(poster_path: Movie["poster_path"]): string {
    return poster_path
      ? `${MovieItem.IMAGE_BASE_URL}${poster_path}`
      : "./images/null_image.png";
  }

  #addEventListeners(modal: MovieDetailModal) {
    this.#parentElement.addEventListener("click", () => {
      const $body = document.querySelector("body");
      const $modalBackground = document.querySelector(".modal-background");
      if (!isHTMLElement($modalBackground) || !isHTMLElement($body)) return;

      modal.show(this.#movie.id);
      $modalBackground.classList.add("active");
      $body.classList.add("active");
    });
  }
}

export default MovieItem;
