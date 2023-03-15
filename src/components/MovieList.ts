import { movieApi } from "../domain/movieApi";

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
      <h2>지금 인기 있는 영화</h2>
      <ul class="item-list">
        ${movieApi.movies.map((movie) => this.renderMovie(movie)).join("")}
      </ul>
      <button id="more-button" class="btn primary full-width">더 보기</button>
    </section>
    `;
  }

  renderMovie(movie: any) {
    return `
    <li>
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
            loading="lazy"
            alt="${movie.title}"
          />
          <p class="item-title">${movie.title}</p>
          <p class="item-score">
            <img src="./assets/star_${
              movie.vote_average > 0 ? "filled" : "empty"
            }.png" alt="별점" /> ${movie.vote_average}
          </p>
        </div>
      </a>
    </li>
    `;
  }
}
