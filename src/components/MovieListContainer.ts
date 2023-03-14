import MovieList from "../domain/MovieList";
import { Movie } from "../types/movie";
import { $ } from "../utils/domSelector";
import MovieItem from "./MovieItem";

const MovieListContainer = {
  render: (isSearch: boolean, movies: Movie[]) => {
    return `
      <section class="item-view">
        <h2>${isSearch ? "검색 결과" : "지금 인기 있는 영화"}</h2>
        <ul class="item-list">
        ${movies.map((movie) => MovieItem.render(movie)).join("")}
        </ul>
        <button id="more-button" class="btn primary full-width">더 보기</button>
      </section>`;
  },

  renderSkeleton: (isSearch: boolean) => {
    return `
      <section class="item-view">
        <h2>${isSearch ? "검색 결과" : "지금 인기 있는 영화"}</h2>
        <ul class="item-list">
        ${`
          <li>
            <a href="#">
              <div class="item-card">
                <div class="item-thumbnail skeleton"></div>
                <div class="item-title skeleton"></div>
                <div class="item-score skeleton"></div>
              </div>
            </a>
            </li>`.repeat(16)}
        </ul>
        <button id="more-button" class="btn primary full-width">더 보기</button>
      </section>`;
  },

  onClick: () => {
    $<HTMLButtonElement>("#more-button").addEventListener("click", async () => {
      const movies: Movie[] = await MovieList.fetchMovieData();
      $<HTMLUListElement>(".item-list").insertAdjacentHTML(
        "beforeend",
        movies.map((movie) => MovieItem.render(movie)).join("")
      );
    });
  },
};

export default MovieListContainer;
