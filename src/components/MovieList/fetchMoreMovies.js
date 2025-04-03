import {
  fetchPopularMovies,
  fetchSearchedMovies,
} from "../../APIs/movieAPI.ts";
import { MOVIE_COUNT } from "../../constants/config.js";
import store from "../../store/store.ts";

export async function fetchMoreMovies(currentPage) {
  const state = store.getState();

  if (!state.query) {
    const newMovies = await fetchPopularMovies(currentPage);
    store.setLoading(false);
    store.setMovies([...state.movies, ...newMovies]);
  } else {
    const newMoviesData = await fetchSearchedMovies(state.query, currentPage);
    store.setLoading(false);
    store.setMovies([...state.movies, ...newMoviesData.results]);
  }
}
