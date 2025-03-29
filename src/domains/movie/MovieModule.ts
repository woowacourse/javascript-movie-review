import { fetchPopularMovies } from "../../APIs/movieAPI.ts";
import store from "../../store/store.ts";
import {
  MovieListRender,
  MovieListMount,
} from "../../components/MovieList/index.js";
import { State, Movie } from "../../../types/movie.ts";

export async function initializeMovieDomain(): Promise<void> {
  const state = store.getState() as State;
  if (state.movies.length === 0) {
    store.setState({ ...state, isLoading: true });
    const movies: Movie[] = await fetchPopularMovies();
    store.setState({ ...store.getState(), movies, isLoading: false });
  }
}

export function renderMovieDomain(): string {
  const state = store.getState() as State;

  return MovieListRender({
    movies: state.movies,
    query: state.query,
    searchedMoviesLength: state.searchedMoviesLength,
    isLoading: state.isLoading,
  });
}

export function mountMovieDomain(): void {
  MovieListMount();
}
