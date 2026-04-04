import { showBackgroundMovieInfo } from "./view/movieListView.ts";
import { bindMovieEvents } from "./events/bindMovieEvent.ts";
import { State } from "./types.ts";
import {
  controlSearchResultText,
  hideSearchErrorText,
  updateTitleText,
} from "./view/textView.ts";
import { loadMovies } from "./service/loadMovies.ts";

const state: State = {
  pageNum: 1,
  searchBarText: "",
  movieList: [],
};

addEventListener("load", async () => {
  try {
    await loadMovies({ state, reset: false });
    showBackgroundMovieInfo(state.movieList[0]);

    bindMovieEvents({
      onMore: async () => {
        try {
          state.pageNum++;
          await loadMovies({ state });
        } catch (error) {
          state.pageNum -= 1;
        }
      },
      onSearch: async (searchBarText) => {
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
      onClick: (title) => {
        const selectedMovie = state.movieList.find(
          (movie) => movie.title == title,
        );

        if (!selectedMovie) return;
        showBackgroundMovieInfo(selectedMovie);
      },
    });
  } catch (error) {
    console.log(error);
  }
});
