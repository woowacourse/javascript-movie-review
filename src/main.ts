/// <reference types="vite/client" />

import Toast from "./components/Toast/Toast";
import createMovieLoader from "./service/loaderService.ts";
import {
  URLS,
  defaultOptions,
  defaultQueryObject,
} from "./setting/settings.ts";

import state from "./state/state.ts";
import type { StateTypes } from "./state/state.ts";

import {
  renderHeaderAndHero,
  renderLoadMoreButton,
  renderMovieList,
} from "./view/MovieView.ts";

const initMovies = () =>
  createMovieLoader(
    URLS.popularMovieUrl,
    defaultQueryObject,
    defaultOptions,
    (error) => Toast.showToast(error.message, "error", 5000)
  );

const initState = () => ({
  loadMovies: initMovies(),
});

const renderApp = (state: StateTypes) => {
  if (!state.loadMovies) return;
  renderHeaderAndHero();
  renderMovieList(state.loadMovies);
  renderLoadMoreButton(state);
};

const main = () => {
  Object.assign(state, initState());
  renderApp(state);
};

main();
