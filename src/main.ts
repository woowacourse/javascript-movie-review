import {
  addMovieList,
  addMovieSkeletonUIList,
  controlTitleText,
  removeMovieSkeletonUIList,
  showBackgroundMovieInfo,
} from "./view/movieListView.ts";
import { fetchMovieList } from "./service/movieApi.ts";
import { getUListElement } from "./view/getElementView.ts";
import { bindMovieEvents } from "./events/bindMovieEvent.ts";
import { State } from "./types.ts";

const state: State = {
  pageNum: 1,
  searchBarText: "",
  movieList: [],
};

export const loadMovies = async ({
  reset = false,
}: { reset?: boolean } = {}) => {
  const movieDisplay = getUListElement(".thumbnail-list");
  if (reset) movieDisplay.replaceChildren();

  addMovieSkeletonUIList(movieDisplay);

  try {
    const path =
      state.searchBarText === "" ? "/movie/popular" : "/search/movie";
    state.movieList = await fetchMovieList(
      path,
      state.pageNum,
      state.searchBarText,
    );

    addMovieList(movieDisplay, state.movieList);
  } finally {
    removeMovieSkeletonUIList(movieDisplay);
  }
};

addEventListener("load", async () => {
  await loadMovies({ reset: false });
  showBackgroundMovieInfo(state.movieList[0]);

  bindMovieEvents({
    onMore: async () => {
      state.pageNum++;
      await loadMovies();
    },
    onSearch: async (searchBarText) => {
      state.pageNum = 1;
      state.searchBarText = searchBarText;

      await loadMovies({ reset: true });

      controlTitleText(state);
    },
    onClick: (title) => {
      const selectedMovie = state.movieList.find(
        (movie) => movie.title == title,
      );

      if (!selectedMovie) return;
      showBackgroundMovieInfo(selectedMovie);
    },
  });
});
