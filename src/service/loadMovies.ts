import { State } from "../types";
import { getElement } from "../view/getElementView";
import {
  addMovieList,
  addMovieSkeletonUIList,
  removeMovieSkeletonUIList,
} from "../view/movieListView";
import { fetchDefaultMovieList, fetchSearchMovieList } from "./movieApi";

export const loadMovies = async ({
  state,
  reset = false,
}: {
  state: State;
  reset?: boolean;
}) => {
  const movieDisplay = getElement(".thumbnail-list", HTMLUListElement);
  if (reset) movieDisplay.replaceChildren();

  addMovieSkeletonUIList(movieDisplay);

  try {
    const fetchedMovies =
      state.searchBarText === ""
        ? await fetchDefaultMovieList(state.pageNum)
        : await fetchSearchMovieList(state.pageNum, state.searchBarText);

    state.movieList = reset
      ? fetchedMovies
      : [...state.movieList, ...fetchedMovies];

    addMovieList(movieDisplay, fetchedMovies);
  } finally {
    removeMovieSkeletonUIList(movieDisplay);
  }
};
