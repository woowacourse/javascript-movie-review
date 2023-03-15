import { movieApi } from "../domain/movieApi";
import { IMovie } from "../type";

export default class MovieList extends HTMLElement {
  constructor() {
    super();
    this.updateMovies();
  }

  async updateMovies() {
    await movieApi.fetchPopularMovieInfo();
  }

  renderMovies() {
    this.innerHTML = `
    <section class="item-view">
      <h2>${
        movieApi.last_keyword === ""
          ? "지금 인기 있는 영화"
          : `"${movieApi.last_keyword}" 검색 결과`
      }</h2>
      ${
        movieApi.movies.length > 0
          ? `<ul class="item-list">
              ${movieApi.movies
                .map((movie) => this.renderMovie(movie))
                .join("")}
            </ul>`
          : `<no-results-message></no-results-message>`
      }
      <button id="more-button" class="btn primary full-width">더 보기</button>
    </section>
    `;
  }

  renderMovie(movie: IMovie) {
    return `
    <li>
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            src="https://image.tmdb.org/t/p/w500/${movie.poster}"
            loading="lazy"
            alt="${movie.title}"
          />
          <p class="item-title">${movie.title}</p>
          <p class="item-score">
            <img src="./assets/star_${
              movie.ratings > 0 ? "filled" : "empty"
            }.png" alt="별점" /> ${movie.ratings.toFixed(1)}
          </p>
        </div>
      </a>
    </li>
    `;
  }
}
