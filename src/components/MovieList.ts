import { Movie } from "../types/movie";
import { isHTMLElement } from "../utils/typeGuards";
import MovieItem from "./MovieItem";

interface MovieListContract {}

export const movieListSkeleton = () => {
  return /*html*/ `
    ${Array.from({ length: 20 })
      .map(
        () => /*html*/ `
        <li class="skeleton-list">
          <div class="skeleton-item">
            <div class="skeleton-thumbnail"></div>
            <div class="skeleton-item-desc">
              <div class="skeleton-text"></div>
              <div class="skeleton-text" style="width: 50%"></div>
            </div>
          </div>
        </li>
      `
      )
      .join("")}`;
};

class MovieList implements MovieListContract {
  private static readonly IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p/original";
  #parentElement: HTMLElement;
  #movies: Movie[];

  constructor(parentElement: HTMLElement, movies: Movie[]) {
    this.#parentElement = parentElement;
    this.#movies = movies;
    this.#render();
  }

  #render() {
    this.#movies.map((movie) => {
      const $list = document.createElement("li");
      new MovieItem($list, movie);
      this.#parentElement.appendChild($list);
    });
  }
}

export default MovieList;
