import { State } from "../types";
import { getUListElement } from "../view/getElementView";
import {
  addMovieList,
  addMovieSkeletonUIList,
  removeMovieSkeletonUIList,
} from "../view/movieListView";
import { showErrorText } from "../view/textView";
import { fetchMovieList } from "./movieApi";

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
    const path =
      state.searchBarText === "" ? "/movie/popular" : "/search/movie";
    state.movieList = await fetchMovieList(
      path,
      state.pageNum,
      state.searchBarText,
    );

    addMovieList(movieDisplay, state.movieList);
  } catch (error) {
    showErrorText("영화 목록을 불러오지 못했습니다.");
    throw error;
  } finally {
    removeMovieSkeletonUIList(movieDisplay);
  }
};
