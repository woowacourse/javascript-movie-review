import { State } from "../types";
import { renderUserRate } from "../view/movieListView";

export const createRatingController = (state: State) => ({
  ratingUserRate: (movieId: number, userRate: number) => {
    state.userRating[movieId] = userRate;
    renderUserRate(movieId, userRate);
  },
});
