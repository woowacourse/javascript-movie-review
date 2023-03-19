import { movieApi } from "../domain/movieApi";
import { movieStore } from "../domain/movieStore";
import { Movie } from "../type";
import { renderSkeletons } from "./movieListHandler";
import { PATH } from "../constants";
const { POPULAR_MOVIE } = PATH;

export default class MovieList extends HTMLElement {
  constructor() {
    super();
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
      ${
        movieStore.movies.length > 0
          ? `<h2>${
              movieApi.url.pathname.includes(POPULAR_MOVIE)
                ? "지금 인기 있는 영화"
                : `"${movieApi.urlParams.get("query")}" 검색 결과`
            }</h2>
            <ul class="item-list">
              ${movieStore.movies
                .map((movie) => this.renderMovie(movie))
                .join("")}
            </ul>`
          : `<no-results-message></no-results-message>`
      }
      <button id="more-button" class="btn primary full-width">더 보기</button>
    </section>
    `;
  }

  renderMovie(movie: Movie) {
    return `
    <li>
      <div class="item-card">
        <img
          class="item-thumbnail"
          src="https://image.tmdb.org/t/p/w500/${movie.poster}"
          onerror="
            this.style.border='1px solid #e2e2e2';
            this.src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
          "
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
    </li>
    `;
  }
}
