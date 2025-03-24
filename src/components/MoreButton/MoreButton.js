import {
  fetchPopularMovies,
  fetchSearchedMovies,
} from "../../APIs/movieAPI.ts";
import { MOVIE_COUNT } from "../../constants/config.js";
import store from "../../store/store.ts";

const MORE_BUTTON = "more-button";

const MoreButton = () => {
  return /* html */ `
    <button id="${MORE_BUTTON}" class="primary more" data-testid="${MORE_BUTTON}">더 보기</button>
  `;
};

export function attachMoreButtonEvent() {
  const $button = document.querySelector("#more-button");

  if ($button) {
    $button.addEventListener("click", async () => {
      const state = store.getState();
      const currentPage =
        Math.floor(state.movies.length / MOVIE_COUNT.UNIT) + 1;

      if (!state.query) {
        const newMovies = await fetchPopularMovies(
          (error) => alert(error.message),
          currentPage
        );
        store.setState({ movies: [...state.movies, ...newMovies] });
        if (state.movies.length >= MOVIE_COUNT.MAX_PAGE * MOVIE_COUNT.UNIT) {
          $button.remove();
        }
        return;
      }

      const newMoviesData = await fetchSearchedMovies(
        state.query,
        (error) => alert(error.message),
        currentPage
      );

      store.setState({
        movies: [...state.movies, ...newMoviesData.results],
      });
      if (state.movies.length >= state.searchedMoviesLength) {
        $button.remove();
      }
    });
  }
}

export default MoreButton;
