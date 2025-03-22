/// <reference types="vite/client" />

import Toast from "./components/Toast/Toast";
import createMovieLoader from "./service/createMovieLoader";
import {
  URLS,
  defaultOptions,
  defaultQueryObject,
} from "./setting/settings.ts";

import state from "./state/state.ts";

import {
  updateMovieList,
  renderHeaderAndHero,
  renderLoadMoreButton,
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

const renderApp = (state) => {
  renderHeaderAndHero();
  updateMovieList(state.loadMovies);
  renderLoadMoreButton(state);
};

const main = () => {
  Object.assign(state, initState());
  renderApp(state);
};

main();
