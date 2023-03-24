import type { Movie } from "../types/type";
import { HTMLTag } from "../utils/constants";

class MovieList extends HTMLElement {
  constructor() {
    super();
  }

  //prettier-ignore
  renderMovies(movies: Movie[]) {
    if (movies.length === 0)
      return `${HTMLTag.NO_SEARCH_TAG}`;
    return movies.map((movie) => /* html */ `
        <movie-item
          id="${movie.id}"
          poster-path="${movie.poster_path}"
          title="${movie.title}"
          vote_average="${movie.vote_average}"
        ></movie-item>`
      )
      .join("");
  }

  render(movies: Movie[]) {
    this.innerHTML = /* html */ `
          ${this.renderMovies(movies)}
          `;
  }

  displaySkeletonUI() {
    const skeletonUI = /* html */ `
      <li>
        <a href="#">
          <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <div class="item-title skeleton"></div>
            <div class="item-score skeleton"></div>
          </div>
        </a>
      </li>
    `.repeat(20);

    this.insertAdjacentHTML("beforeend", skeletonUI);
  }

  removeSkeletonUI() {
    this.innerHTML = "";
  }
}

interface MovieList {
  "movie-list": typeof MovieList;
}

customElements.define("movie-list", MovieList);

export default MovieList;
