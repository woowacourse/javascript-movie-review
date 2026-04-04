// import "../templates/styles/index.css";

import {
  addMovieList,
  addMovieSkeletonUIList,
  removeMovieSkeletonUIList,
  showBackgroundMovieInfo,
} from "./view/movieListView.ts";
import { fetchMovieList } from "./service/movieApi.ts";
import { getUListElement } from "./view/getElementView.ts";

import {
  bindClickPosterEvent,
  bindMoreMovieEvents,
  bindSearchEvents,
} from "./events/bindMovieEvent.ts";

export type State = {
  pageNum: number;
  searchBarText: string;
};

const state: State = {
  pageNum: 1,
  searchBarText: "",
};

export const loadMovies = async ({ reset = false }: { reset: boolean }) => {
  const movieDisplay = getUListElement(".thumbnail-list");

  if (reset) {
    movieDisplay.replaceChildren();
  }

  addMovieSkeletonUIList(movieDisplay);

  try {
    const path =
      state.searchBarText === "" ? "/movie/popular" : "/search/movie";
    const movieList = await fetchMovieList(
      path,
      state.pageNum,
      state.searchBarText,
    );

    addMovieList(movieDisplay, movieList);
  } catch (error) {
  } finally {
    removeMovieSkeletonUIList(movieDisplay);
  }
};

addEventListener("load", async () => {
  loadMovies({ reset: false });

  // showBackgroundMovieInfo(movieList[0]);

  bindSearchEvents(state);
  bindMoreMovieEvents(state);
  bindClickPosterEvent(state);
});
