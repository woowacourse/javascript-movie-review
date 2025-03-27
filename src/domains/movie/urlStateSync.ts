import { fetchSearchedMovies } from "../../APIs/movieAPI.ts";
import store from "../../store/store.ts";
import * as MovieModule from "../../domains/movie/MovieModule.js";

export async function syncSearchStateWithURL(): Promise<void> {
  const params = new URLSearchParams(window.location.search);
  const query: string | null = params.get("query");

  store.setState({ ...store.getState(), isLoading: true });

  if (query) {
    const searchedMovies = await fetchSearchedMovies(query);
    if (searchedMovies) {
      store.setState({
        movies: searchedMovies.results,
        query: query,
        searchedMoviesLength: searchedMovies.total_results,
        isLoading: false,
      });
    } else {
      store.setState({ ...store.getState(), isLoading: false });
    }
  } else {
    store.setState({
      ...store.getState(),
      movies: [],
      query: "",
      searchedMoviesLength: 0,
      isLoading: true,
    });
    await MovieModule.initializeMovieDomain();
  }
}
