import { fetchPopularMovies } from "../../APIs/movieAPI";
import store from "../../store/store";
import {
  MovieListRender,
  MovieListMount,
} from "../../components/MovieList/index";
import { AppState, Movie } from "../../../types/movie.ts";

export async function initializeMovieDomain(): Promise<void> {
  const state = store.getState() as AppState;
  if (state.movies.length === 0) {
    const movies: Movie[] = await fetchPopularMovies();
    store.setState({ movies });
  }
}

export function renderMovieDomain(): string {
  const state = store.getState() as AppState;
  return MovieListRender({
    movies: state.movies,
    query: state.query,
    searchedMoviesLength: state.searchedMoviesLength,
  });
}

export function mountMovieDomain(): void {
  MovieListMount();
}
