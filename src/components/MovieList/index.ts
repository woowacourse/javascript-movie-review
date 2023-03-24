import Store from "../../domain/Store";
import { Movie } from "../../type";
import { renderSkeletons } from "./movieListHandler";

export default class MovieList extends HTMLElement {
  private store: Store;
  constructor() {
    super();
    this.store = Store.getInstance();
    this.innerHTML = `
    <section class="item-view">
      <h2>지금 인기 있는 영화</h2>
      <ul class="item-list">${renderSkeletons()}</ul>
    </section>
    `;
  }

  renderMovies() {
    this.innerHTML = `
    <section class="item-view">
      ${this.store.getMovies().length > 0
        ? `<h2>${this.store.getLastKeyword() === ""
          ? "지금 인기 있는 영화"
          : `"${this.store.getLastKeyword()}" 검색 결과`
        }</h2>
            <ul class="item-list">
              ${this.store.getMovies()
          .map((movie) => `<movie-item id="moive-${movie.id}"></movie-item>`)
          .join("")}
            </ul>`
        : `<no-results-message></no-results-message>`
      }
      <div id="loading-trigger" ></div>
    </section>
    `;
  }
}
