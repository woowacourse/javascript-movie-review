import { showBackgroundMovieInfo } from "./view/movieListView.ts";
import { bindMovieEvents } from "./events/bindMovieEvent.ts";
import { State } from "./types.ts";
import { loadMovies } from "./service/loadMovies.ts";
import { createMovieController } from "./controller/movieController.ts";
import { showErrorText } from "./view/textView.ts";

const state: State = {
  pageNum: 1,
  searchBarText: "",
  movieList: [],
};

addEventListener("load", async () => {
  const movieController = createMovieController(state);

  try {
    movieController.initPage();
  } finally {
    bindMovieEvents({
      onMore: movieController.loadMoreMovies,
      onSearch: movieController.searchMovies,
      onClick: movieController.clickMovie,
    });
  }
});
