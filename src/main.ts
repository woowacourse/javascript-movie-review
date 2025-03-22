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

function main() {
  state.loadMovies = createMovieLoader(
    URLS.popularMovieUrl,
    defaultQueryObject,
    defaultOptions,
    (error) => {
      Toast.showToast(error.message, "error", 5000);
    }
  );

  renderHeaderAndHero();
  updateMovieList(state.loadMovies);
  renderLoadMoreButton(state);
}

main();
