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
  hideElement,
  updateDetails,
  updateHero,
} from "./view/MovieView.ts";
import type { TMDBDetails } from "../types/tmdb.types.ts";
import fetchAndSetLoadingEvent from "./service/fetchService.ts";
import { setupInfiniteScroll } from "./service/scrollService.ts";
import {
  handleConnectionError,
  checkApiAvailability,
} from "./service/errorService.ts";
import { fetchUrl } from "./util/fetch.ts";

let infiniteScrollInstance = null;
const initMovies = () =>
  createMovieLoader(
    URLS.popularMovieUrl,
    defaultQueryObject,
    defaultOptions,
    handleError
  );

const handleError = (error: Error) => {
  Toast.showToast(error.message, "error", 5000);
  checkApiAvailability(infiniteScrollInstance);
};

const initState = () => ({
  loadMovies: initMovies(),
});

const renderApp = (data) => {
  renderHeaderAndHero();
  const firstMovieShown = data.results[0];
  updateHero(firstMovieShown);
  updateDetails(firstMovieShown);
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
document
  .getElementById("thumbnail-list")
  ?.addEventListener("click", ({ target }) => {
    const { id } = target?.closest("li") ?? {};
    if (id) {
      handleItemClick(id);
    }
  });
window.addEventListener("online", () => {
  infiniteScrollInstance.resumeInfiniteScroll();
});
async function handleItemClick(id: string) {
  const detailsUrl = "https://api.themoviedb.org/3/movie";
  try {
    const result: TMDBDetails = await fetchUrl(
      detailsUrl,
      defaultQueryObject,
      defaultOptions,
      id
    );
    const modal = document.getElementById("modal-dialog");
    updateDetails(result);
    updateHero(result);
    const skeleton = document.getElementById("details-skeleton");
    const detailsImage = document.getElementById("details-image");
    showElement(skeleton);
    hideElement(detailsImage);
    modal.showModal();
  } catch (error) {
    Toast.showToast(error.message, "error", 5000);
  }
}

document.getElementById("details-image").addEventListener("load", () => {
  const skeleton = document.getElementById("details-skeleton");
  const detailsImage = document.getElementById("details-image");
  hideElement(skeleton);
  showElement(detailsImage);
});

const modal = document.getElementById("modal-dialog");
document.getElementById("closeModal").addEventListener("click", () => {
  modal.close();
});
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.close();
  }
});
main();

export { infiniteScrollInstance };
