import type { Movie } from "../types/type";

class MovieList extends HTMLElement {
  constructor() {
    super();
  }

  //prettier-ignore
  renderMovies(movies: Movie[]) {
    if (movies.length === 0)
      return `<p class="not-search">해당 검색 결과가 없습니다</p>`;
    return movies.map((movie) => /* html */ `
        <movie-item
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
    `;

    this.insertAdjacentHTML("beforeend", skeletonUI.repeat(20));
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
