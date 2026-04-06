import { State } from "../types";
import { getUListElement } from "../view/getElementView";
import {
  addMovieList,
  addMovieSkeletonUIList,
  removeMovieSkeletonUIList,
} from "../view/movieListView";
import { showErrorText } from "../view/textView";
import { fetchDefaultMovieList, fetchSearchMovieList } from "./movieApi";

export const loadMovies = async ({
  state,
  reset = false,
}: {
  state: State;
  reset?: boolean;
}) => {
  const movieDisplay = getUListElement(".thumbnail-list");
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
  } catch (error) {
    showErrorText("영화 목록을 불러오지 못했습니다.");
    throw error;
  } finally {
    removeMovieSkeletonUIList(movieDisplay);
  }
};
