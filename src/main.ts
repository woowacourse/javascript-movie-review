import { State } from "./types.ts";
import { createMovieController } from "./controller/movieController.ts";
import { createRatingController } from "./controller/ratingController.ts";
import { bindRatingEvent } from "./events/bindRatingEvent.ts";
import { bindMovieEvents } from "./events/bindMovieEvent.ts";

const state: State = {
  pageNum: 1,
  searchBarText: "",
  movieList: [],
  userRating: {},
};

addEventListener("load", async () => {
  const movieController = createMovieController(state);
  const ratingController = createRatingController(state);

  try {
    await movieController.initPage();
  } finally {
    bindMovieEvents({
      onMore: movieController.loadMoreMovies,
      onSearch: movieController.searchMovies,
      onClick: movieController.clickMovie,
    });
    bindRatingEvent({ onRate: ratingController.ratingUserRate });
  }
});
