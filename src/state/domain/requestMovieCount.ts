import { createStore } from "../utils/state";

const DEFAULT_REQUEST_MOVIE_COUNT = 20;

export const requestMovieCount = createStore(DEFAULT_REQUEST_MOVIE_COUNT);
