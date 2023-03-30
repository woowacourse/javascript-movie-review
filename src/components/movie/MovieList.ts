import type { Movie } from "../../types/type";

class MovieList extends HTMLElement {
  constructor() {
    super();
  }

  render(movies: Movie[]) {
    if (movies.length === 0) {
      this.innerHTML = `<p class="not-search">해당 검색 결과가 없습니다</p>`;
      return;
    }
    this.insertAdjacentHTML(
      "beforeend",
      `${movies
        .map(
          (movie) => /* html */ `
            <movie-item
              movieID="${movie.id}"
              poster-path="${movie.poster_path}"
              title="${movie.title}"
              vote_average="${movie.vote_average}"
            ></movie-item>`
        )
        .join("")}
        `
    );
  }
}

interface MovieList {
  "movie-list": typeof MovieList;
}

customElements.define("movie-list", MovieList);

export default MovieList;
