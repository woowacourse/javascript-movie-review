/// <reference types="vite/client" />

import type { InfiniteScrollInstance } from "./service/scrollService.ts";
import {
  URLS,
  defaultOptions,
  defaultQueryObject,
} from "./setting/settings.ts";
import { setLoadMovies, setShowingItem } from "./state/movieState.ts";
import {
  renderHeaderAndHero,
  renderMovieItems,
  updateDetails,
  updateHero,
} from "./view/MovieView.ts";
import Toast from "./components/Toast/Toast";
import createMovieLoader from "./service/loaderService.ts";
import fetchAndSetLoadingEvent from "./service/fetchService.ts";
import { setupInfiniteScroll } from "./service/scrollService.ts";
import {
  handleConnectionError,
  checkApiAvailability,
} from "./service/errorService.ts";
import {
  bindDetailsImageLoadEvent,
  bindLoadingEvents,
  bindModalEvents,
  bindOnlineEvent,
  bindStarRatingEvents,
  bindThumbnailClickEvent,
} from "./binders/event-binders";

let infiniteScrollInstance: InfiniteScrollInstance = null;

const initMovies = () => {
  return createMovieLoader(
    URLS.popularMovieUrl,
    defaultQueryObject,
    defaultOptions,
    handleError
  );
};
const handleError = (error: Error) => {
  Toast.showToast(error.message, "error", 5000);
  checkApiAvailability(infiniteScrollInstance);
};

const renderApp = (data) => {
  renderHeaderAndHero();
  const firstMovieShown = data.results[0];
  setShowingItem(data.results[0].id);
  updateHero(firstMovieShown);
  updateDetails(firstMovieShown);
  renderMovieItems(data.results, false);
};
const bindEventListeners = () => {
  bindLoadingEvents();
  bindThumbnailClickEvent();
  bindModalEvents();
  bindStarRatingEvents();
  bindDetailsImageLoadEvent();
  // bindOnlineEvent(infiniteScrollInstance);
};

const main = async () => {
  try {
    const loadMovies = initMovies();
    setLoadMovies(loadMovies);
    const data = await fetchAndSetLoadingEvent();
    infiniteScrollInstance = setupInfiniteScroll();
    renderApp(data);
    bindEventListeners();
  } catch (error) {
    handleConnectionError();
  }
};

main();

export { infiniteScrollInstance };
