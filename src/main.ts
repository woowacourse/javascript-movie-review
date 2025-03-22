/// <reference types="vite/client" />

import Toast from "./components/Toast/Toast.js";
import createMovieLoader from "./service/createMovieLoader";
import { URLS, defaultOptions, defaultQueryObject } from "./setting/settings";

import state from "./state/state.ts";

import {
  updateMovieList,
  renderHeaderAndHero,
  renderLoadMoreButton,
} from "./view/MovieView.ts";

function init() {
  state.loadMovies = createMovieLoader(
    URLS.popularMovieUrl,
    defaultQueryObject,
    defaultOptions,
    undefined,
    (error) => {
      Toast.showToast(error.message, "error", 5000);
    }
  );
}

init();

function render() {
  renderHeaderAndHero();
  updateMovieList(state.loadMovies);
  renderLoadMoreButton(state);
}

render();
