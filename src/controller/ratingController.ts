import { loadUserRate, saveUserRate } from "../service/storageUserRate";
import { State } from "../types";
import { renderUserRate } from "../view/movieListView";

export const createRatingController = (state: State) => ({
  initUserRating: () => {
    state.userRating = loadUserRate();
  },

  ratingUserRate: (movieId: number, userRate: number) => {
    state.userRating[movieId] = userRate;

    // 로컬 스토리지에 저장
    saveUserRate(state.userRating);

    renderUserRate(movieId, userRate);
  },
});
