import { $ } from "../utils/Dom";

export default class MovieCardList extends HTMLElement {
  #movieList = [];

  get header() {
    return this.getAttribute("header");
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `
        <h2>${this.header}</h2>
        <ul id="movie-list" class="item-list">
        </ul>
        <skeleton-list class="hidden"></skeleton-list> 
        `;
  }

  setMovieList(movieList) {
    const moreButton = $("more-button");
    this.#movieList = movieList;
    if (this.#movieList.length === 20) moreButton.classList.remove("hidden");

    const $movieList = $("#movie-list");
    this.#movieList.forEach((item) => {
      $movieList.insertAdjacentHTML(
        "beforeend",
        `<movie-card title='${item.title}' poster='${item.poster}' rating='${item.rating}' movieId='${item.movieId}'></movie-card>`
      );
    });
  }

  toggleSkeletonList() {
    const $skeletonList = $("skeleton-list");
    $skeletonList.classList.toggle("hidden");
  }
}

customElements.define("card-list", MovieCardList);
