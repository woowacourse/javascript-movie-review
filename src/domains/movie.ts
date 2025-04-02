import { Score } from "../../types/starRating";
import { MOVIE_COUNT } from "../constants/config";
import Store, { State } from "../store/store";

const isPossibleLoadPopularMovies = (state: State): boolean => {
  return (
    !state.query &&
    state.movies.length < MOVIE_COUNT.MAX_PAGE * MOVIE_COUNT.UNIT
  );
};

const isPossibleLoadSearchedMovies = (state: State): boolean => {
  return state.query !== "" && state.movies.length < state.searchedMoviesLength;
};

const getCurrentPage = (moviesLength: number, unit: number): number => {
  return Math.floor(moviesLength / unit) + 1;
};

const getCurrentScore = (id: string, store: Store): Score => {
  const scores = store.getState().starRatings || [];
  return scores.find((rating) => rating.id === id)?.score || 0;
};

async function withLoading<T>(
  store: Store,
  asyncFunc: () => Promise<T>
): Promise<T> {
  store.setState({ loading: true });
  try {
    const result = await asyncFunc();
    return result;
  } finally {
    store.setState({ loading: false });
  }
}

export {
  isPossibleLoadPopularMovies,
  isPossibleLoadSearchedMovies,
  getCurrentPage,
  getCurrentScore,
  withLoading,
};
