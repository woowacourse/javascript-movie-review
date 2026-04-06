import { loadMovies } from "../service/loadMovies";
import { State } from "../types";
import { showBackgroundMovieInfo } from "../view/movieListView";
import {
  controlSearchResultText,
  hideSearchErrorText,
  showErrorText,
  updateTitleText,
} from "../view/textView";

export const createMovieController = (state: State) => ({
  initPage: async () => {
    try {
      await loadMovies({ state, reset: false });
      if (state.movieList[0]) showBackgroundMovieInfo(state.movieList[0]);
    } catch (error) {
      showErrorText("초기 화면을 불러오지 못했습니다.");
    }
  },

  loadMoreMovies: async () => {
    try {
      state.pageNum++;
      await loadMovies({ state });
    } catch (error) {
      state.pageNum -= 1;
      showErrorText("영화를 추가로 불러오지 못했습니다.");
    }
  },
  searchMovies: async (searchBarText: string) => {
    state.pageNum = 1;
    state.searchBarText = searchBarText;

    try {
      hideSearchErrorText();
      updateTitleText(state);

      await loadMovies({ state, reset: true });

      controlSearchResultText(state);
    } catch (error) {
      showErrorText("검색 결과를 불러오지 못했습니다.");
    }
  },
  clickMovie: (title: string) => {
    const selectedMovie = state.movieList.find((movie) => movie.title == title);

    if (!selectedMovie) return;
    showBackgroundMovieInfo(selectedMovie);
  },
});
