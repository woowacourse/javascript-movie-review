import type { Movie } from "../types/type";

class MovieList extends HTMLElement {
  constructor() {
    super();
  }

  render(movies: Movie[]) {
    this.innerHTML = /* html */ `
      ${
        movies.length !== 0
          ? movies
              .map(
                (movie) => /* html */ `
                  <movie-item
                    poster-path="${movie.poster_path}"
                    title="${movie.title}"
                    vote_average="${movie.vote_average}"
                  ></movie-item>`
              )
              .join("")
          : '<p class="not-search">해당 검색 결과가 없습니다</p>'
      }
    `;
  }

  displaySkeletonUI() {
    this.innerHTML = /* html */ `
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
  }
}

interface MovieList {
  "movie-list": typeof MovieList;
}

customElements.define("movie-list", MovieList);

export default MovieList;
