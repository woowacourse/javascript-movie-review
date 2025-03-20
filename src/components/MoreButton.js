import { fetchPopularMovies, fetchSearchedMovies } from "../APIs/movieAPI.ts";
import store from "../store/store.ts";

const MoreButton = () => {
  return /* html */ `<button id="more-button" class="primary more" data-testid="more-button">더 보기</button>`;
};

export function attachMoreButtonEvent() {
  const $button = document.querySelector("#more-button");
  if ($button) {
    $button.addEventListener("click", async () => {
      const state = store.getState();
      const currentPage = Math.floor(state.movies.length / 20) + 1;

      if (!state.query) {
        const newMovies = await fetchPopularMovies(currentPage);
        store.setState({ movies: [...state.movies, ...newMovies] });
        if (state.movies.length >= 500 * 20) {
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

export default MoreButton;
