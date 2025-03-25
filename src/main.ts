/// <reference types="vite/client" />

import Toast from "./components/Toast/Toast";
import createMovieLoader from "./service/loaderService.ts";
import {
  URLS,
  defaultOptions,
  defaultQueryObject,
} from "./setting/settings.ts";

import state from "./state/state.ts";

import {
  renderHeaderAndHero,
  renderMovieItems,
  showElement,
} from "./view/MovieView.ts";

import { hideElement } from "./view/MovieView.ts";
import fetchAndSetLoadingEvent from "./service/fetchService.ts";
import { setupInfiniteScroll } from "./service/scrollService.ts";
import { updateHero } from "./view/MovieView.ts";
import { handleConnectionError } from "./service/errorService.ts";

let infiniteScrollInstance = null;
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

const renderApp = (data) => {
  renderHeaderAndHero();
  const firstMovieShown = data.results[0];
  updateHero(firstMovieShown);
  renderMovieItems(data.results, false);
};

const main = async () => {
  Object.assign(state, initState());
  try {
    const data = await fetchAndSetLoadingEvent(state);
    infiniteScrollInstance = setupInfiniteScroll(state);
    renderApp(data);
  } catch {
    handleConnectionError();
  }
};

if (!window._loadingEventRegistered) {
  document.addEventListener("loading:start", () => {
    const skeleton = document.querySelector(".skeleton-list");
    const loadMore = document.getElementById("load-more");
    if (skeleton) showElement(skeleton);
    if (loadMore) hideElement(loadMore);
  });

  document.addEventListener("loading:end", (e) => {
    const skeleton = document.querySelector(".skeleton-list");
    const loadMore = document.getElementById("load-more");
    if (skeleton) hideElement(skeleton);
    if (loadMore && (!e.detail || !e.detail.isLastPage)) {
      showElement(loadMore);
    }
  });

  window._loadingEventRegistered = true;
}

main();

export { infiniteScrollInstance };
