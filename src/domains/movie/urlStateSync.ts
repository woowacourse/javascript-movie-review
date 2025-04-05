import { fetchSearchedMovies } from "../../APIs/movieAPI.ts";
import store from "../../store/store.ts";
import * as MovieModule from "../../domains/movie/MovieModule.js";

export async function syncSearchStateWithURL(): Promise<void> {
  const params = new URLSearchParams(window.location.search);
  const query: string | null = params.get("query");

  store.setLoading(true);

  if (query) {
    const searchedMovies = await fetchSearchedMovies(query);
    if (searchedMovies) {
      store.setLoading(false);
      store.setMovies(searchedMovies.results);
      store.setQuery(query);
      store.setSearchedMoviesLength(searchedMovies.total_results);
    } else {
      store.setLoading(false);
    }
  } else {
    store.setLoading(true);
    store.setMovies([]);
    store.setQuery("");
    store.setSearchedMoviesLength(0);

    await MovieModule.initializeMovieDomain();
  }
}
