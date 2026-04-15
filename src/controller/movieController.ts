import { loadMovies } from "../service/loadMovies";
import { fetchMovieDetail } from "../service/movieApi";
import { State } from "../types";
import { showDetailModal } from "../view/modalView";
import { showBackgroundMovieInfo } from "../view/movieListView";
import {
  hideErrorText,
  showErrorText,
  updateTitleText,
} from "../view/textView";
import { renderUserRate } from "../view/userRatingView";

export const createMovieController = (state: State) => ({
  initPage: async () => {
    try {
      await loadMovies({ state, reset: false });

      if (state.movieList.length === 0) {
        showErrorText("표시할 영화가 없습니다.");
        return;
      }

      showBackgroundMovieInfo(state.movieList[0]);
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
      window.scrollTo({ top: 0 });
      showErrorText("영화를 추가로 불러오지 못했습니다.");
    }
  },
  searchMovies: async (searchBarText: string) => {
    state.pageNum = 1;
    state.searchBarText = searchBarText;

    try {
      hideErrorText();
      updateTitleText(state);

      await loadMovies({ state, reset: true });

      if (state.searchBarText !== "" && state.movieList.length === 0)
        showErrorText("검색 결과가 없습니다.");
    } catch (error) {
      showErrorText("검색 결과를 불러오지 못했습니다.");
    }
  },
  clickMovie: async (title: string) => {
    const selectedMovie = state.movieList.find((movie) => movie.title == title);

    if (!selectedMovie) return;

    if (state.searchBarText === "") showBackgroundMovieInfo(selectedMovie);

    try {
      const movieDetail = await fetchMovieDetail(selectedMovie.id);
      showDetailModal(movieDetail);
      renderUserRate(movieDetail.id, state.userRating[movieDetail.id] ?? 0);
    } catch (error) {
      showErrorText("영화 상세 정보를 불러오지 못했습니다.");
    }
  },
});
