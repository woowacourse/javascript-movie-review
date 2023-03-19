import {
  MAX_MOVIE_QUANTITY_PER_PAGE,
  TOGGLE_SKELETON,
} from "../constant/variables";
import { $ } from "../utils/Dom";
import MoreButton from "./MoreButton";
import SkeletonList from "./SkeletonList";

export default class MovieCardList extends HTMLElement {
  #movieList: movieList = [];

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

  setMovieList(movieList: movieList) {
    this.toggleMoreButton(movieList);

    const $movieList = $("#movie-list");
    if ($movieList instanceof HTMLElement)
      movieList.forEach((item: movieInfo) => {
        $movieList.insertAdjacentHTML(
          "beforeend",
          `<movie-card movieTitle='${item.title}' poster='${item.poster}' rating='${item.rating}' movieId='${item.movieId}'></movie-card>`
        );
      });

    this.#movieList = movieList;
  }

  toggleMoreButton(movieList: movieList) {
    const $moreButton = $("more-button");
    if ($moreButton instanceof MoreButton)
      if (movieList.length === MAX_MOVIE_QUANTITY_PER_PAGE)
        $moreButton.classList.remove("hidden");
  }

  toggleSkeletonList(method: toggleSkeleton) {
    const $skeletonList = $("skeleton-list");
    if ($skeletonList instanceof SkeletonList)
      method === TOGGLE_SKELETON.HIDDEN
        ? $skeletonList.classList.add("hidden")
        : $skeletonList.classList.remove("hidden");
  }
}

customElements.define("card-list", MovieCardList);
