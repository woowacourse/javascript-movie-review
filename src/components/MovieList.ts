import type { Movie } from "../types/type";

customElements.define(
  "movie-list",
  class MovieList extends HTMLElement {
    constructor() {
      super();
    }

    render(movies: Movie[]) {
      this.innerHTML = /* html */ `
            <ul class="item-list">
            ${movies.map(
              (movie) => `
            <movie-item><movie-item/>`
            )}
            </ul>
            `;
    }
  }
);
