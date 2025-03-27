import {
  fetchPopularMovies,
  fetchSearchedMovies,
} from "../../APIs/movieAPI.ts";
import { MOVIE_COUNT } from "../../constants/config.js";
import store from "../../store/store.ts";

export function MoreButtonRender() {
  return /* html */ `
    <button id="more-button" class="primary more" data-testid="more-button">더 보기</button>
  `;
}

export function MoreButtonMount() {
  const $button = document.querySelector("#more-button");
  if ($button) {
    $button.addEventListener("click", async () => {
      const state = store.getState();
      const currentPage =
        Math.floor(state.movies.length / MOVIE_COUNT.UNIT) + 1;

      if (!state.query) {
        const newMovies = await fetchPopularMovies(currentPage);
        store.setState({ movies: [...state.movies, ...newMovies] });
        if (state.movies.length >= MOVIE_COUNT.MAX_PAGE * MOVIE_COUNT.UNIT) {
          $button.remove();
        }
      } else {
        const newMoviesData = await fetchSearchedMovies(
          state.query,
          currentPage
        );
        store.setState({ movies: [...state.movies, ...newMoviesData.results] });
        if (state.movies.length >= state.searchedMoviesLength) {
          $button.remove();
        }
      }
    });
  }
}
