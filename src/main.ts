/// <reference types="vite/client" />

import {
  URLS,
  defaultOptions,
  defaultQueryObject,
} from "./setting/settings.ts";
import {
  setLoadMovies,
  setScrollInstance,
  setShowingItem,
} from "./state/movieState.ts";
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
  handleNetworkError,
} from "./service/errorService.ts";
import { bindAllEvents } from "./binders/event-binders";
import { convertResultToTMDBDetails } from "./util/adapters.ts";
import initScrollToTopButton from "./components/scrollToTop/scrollToTop.ts";

const handleError = (error: Error) => {
  Toast.showToast(error.message, "error", 5000);
  handleNetworkError();
};

const initMovies = () => {
  return createMovieLoader(
    URLS.popularMovieUrl,
    defaultQueryObject,
    defaultOptions,
    handleError
  );
};

const main = async () => {
  try {
    const loadMovies = initMovies();
    setLoadMovies(loadMovies);

    const data = await fetchAndSetLoadingEvent(null);
    if (!data) {
      throw new Error("데이터가 없습니다. 잠시후 다시 사용해주세요.");
    }

    const firstMovie = data.results[0];
    setShowingItem(String(firstMovie.id));

    renderHeaderAndHero();
    updateHero(firstMovie);
    updateDetails(convertResultToTMDBDetails(firstMovie));
    renderMovieItems(data.results, false);

    const infiniteScrollInstance = setupInfiniteScroll();
    setScrollInstance(infiniteScrollInstance);

    bindAllEvents(infiniteScrollInstance);

    initScrollToTopButton();
  } catch (error) {
    handleConnectionError();
  }
};

main();
