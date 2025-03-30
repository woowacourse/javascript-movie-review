import {
  fetchPopularMovies,
  fetchSearchedMovies,
} from "../../APIs/movieAPI.ts";
import { MOVIE_COUNT } from "../../constants/config.js";
import store from "../../store/store.ts";

export async function fetchMoreMovies() {
  const state = store.getState();
  const currentPage = Math.floor(state.movies.length / MOVIE_COUNT.UNIT) + 1;

  store.setState({ ...state, isLoading: true });

  if (!state.query) {
    const newMovies = await fetchPopularMovies(currentPage);
    store.setState({
      ...store.getState(),
      movies: [...state.movies, ...newMovies],
      isLoading: false,
    });
  } else {
    const newMoviesData = await fetchSearchedMovies(state.query, currentPage);
    store.setState({
      ...store.getState(),
      movies: [...state.movies, ...newMoviesData.results],
      isLoading: false,
    });
  }
}
