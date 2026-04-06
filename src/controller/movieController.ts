import { loadMovies } from "../service/loadMovies";
import { State } from "../types";
import { showBackgroundMovieInfo } from "../view/movieListView";
import {
  controlSearchResultText,
  hideSearchErrorText,
  updateTitleText,
} from "../view/textView";

export const createMovieController = (state: State) => ({
  loadMoreMovies: async () => {
    try {
      state.pageNum++;
      await loadMovies({ state });
    } catch (error) {
      state.pageNum -= 1;
    }
  },
  searchMovies: async (searchBarText: string) => {
    state.pageNum = 1;
    state.searchBarText = searchBarText;

    try {
      hideSearchErrorText();
      updateTitleText(state);

      await loadMovies({ state, reset: true });

      controlSearchResultText(state);
    } catch (error) {
      state.searchBarText = "";
    }
  },
  clickMovie: async (title: string) => {
    const selectedMovie = state.movieList.find((movie) => movie.title == title);

    if (!selectedMovie) return;
    showBackgroundMovieInfo(selectedMovie);
  },
});
