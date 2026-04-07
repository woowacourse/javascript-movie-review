import { bindMovieEvents } from "./events/bindMovieEvent.ts";
import { State } from "./types.ts";
import { createMovieController } from "./controller/movieController.ts";

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
