import { showBackgroundMovieInfo } from "./view/movieListView.ts";
import { bindMovieEvents } from "./events/bindMovieEvent.ts";
import { State } from "./types.ts";
import { loadMovies } from "./service/loadMovies.ts";
import { createMovieController } from "./controller/movieController.ts";

const state: State = {
  pageNum: 1,
  searchBarText: "",
  movieList: [],
};

addEventListener("load", async () => {
  const movieController = createMovieController(state);

  try {
    await loadMovies({ state, reset: false });
    showBackgroundMovieInfo(state.movieList[0]);

    bindMovieEvents({
      onMore: movieController.loadMoreMovies,
      onSearch: movieController.searchMovies,
      onClick: movieController.clickMovie,
    });
  } catch (error) {
    console.log(error);
  }
});
