import { Movie } from "../types/movie";

class MovieItem {
  #parentElement;
  #movie;
  private static readonly IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p/original";

  constructor(
    parentElement: HTMLElement,
    movie: Movie,
    showModal: (id: number) => void
  ) {
    this.#parentElement = parentElement;
    this.#movie = movie;
    this.#render();
    this.#addEventListeners(showModal);
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

  #addEventListeners(showModal: (id: number) => void) {
    this.#parentElement.addEventListener("click", () => {
      showModal(this.#movie.id);
    });
  }
}

export default MovieItem;
