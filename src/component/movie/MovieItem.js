import MovieBoss from "../../domain/MovieBoss";
import { $ } from "../../util/dom";
import CustomElement from "../basic/CustomElement";

class MovieItem extends CustomElement {
  #movie = {
    id: null,
    title: "",
    src: "",
    voteAverage: "",
    detail: "",
    genre_ids: [],
  };

  template() {
    this.#movie.id = this.getAttribute("id");
    this.#movie.title = this.getAttribute("title");
    this.#movie.voteAverage = this.getAttribute("vote_average");
    this.#movie.detail = this.getAttribute("detail");
    this.#movie.genre_ids = this.getAttribute("genre_ids");
    const img = this.getAttribute("src");
    this.#movie.src =
      img === "null"
        ? "./image/noImg.jpeg"
        : `https://image.tmdb.org/t/p/w220_and_h330_face${img}`;

    return `
      <div class="item-card">
        <img
          class="item-thumbnail skeleton"
          loading="lazy"
          src= ${this.#movie.src}
          alt=${this.#movie.title}
        />
        <p class="item-title">${this.#movie.title}</p>
        <p class="item-score">
        <img src="./image/star_filled.png" alt="별점" />
        ${this.#movie.voteAverage}
        </p>
      </div>
  `;
  }

  setEvent() {
    const image = $(".item-thumbnail");
    image.addEventListener("load", () => {
      image.classList.remove("skeleton");
    });

    this.addEventListener("click", () => {
      MovieBoss.deliverModal(this.#movie);

      $(".modal-open").classList.remove("modal");
      this.closest("body").classList.add("scroll");
    });
  }
}

customElements.define("movie-item", MovieItem);

export default MovieItem;
