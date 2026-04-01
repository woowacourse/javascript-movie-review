import "../templates/styles/index.css";

import {
  addMovieList,
  addMovieSkeletonUIList,
  removeMovieSkeletonUIList,
} from "./view/movieListView.ts";
import { fetchDefaultMovieList } from "./service/movieApi.ts";
import { getUListElement } from "./view/getElementView.ts";

import {
  bindMoreMovieEvents,
  bindSearchEvents,
} from "./events/bindMovieEvent.ts";

export type State = {
  pageNum: number;
  searchBarText: string;
};

addEventListener("load", async () => {
  const state: State = {
    pageNum: 1,
    searchBarText: "",
  };
  const movieDisplay = getUListElement(".thumbnail-list");

  addMovieSkeletonUIList(movieDisplay, 20);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const [movieList] = await Promise.all([
    fetchDefaultMovieList(state.pageNum),
    delay(2000),
  ]);

  removeMovieSkeletonUIList(movieDisplay);

  addMovieList(movieDisplay, movieList);

  bindSearchEvents(state);
  bindMoreMovieEvents(state);
});
