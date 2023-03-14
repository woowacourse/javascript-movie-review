import type { Movie } from "../types/type";

class MovieList extends HTMLElement {
  constructor() {
    super();
  }

  render(movies: Movie[]) {
    this.innerHTML = /* html */ `
          ${movies
            .map(
              (movie) => /* html */ `
            <movie-item
              poster-path="${movie.poster_path}"
              title="${movie.title}"
              vote_average="${movie.vote_average}"
            ></movie-item>`
            )
            .join("")}
          `;
  }
}

interface MovieList {
  "movie-list": typeof MovieList;
}

customElements.define("movie-list", MovieList);
