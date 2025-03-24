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
  renderLoadMoreButton,
  renderMovieItems,
  showElement,
} from "./view/MovieView.ts";

import { hideElement } from "./view/MovieView.ts";
import fetchAndSetLoadingEvent from "./service/fetchService.ts";

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
  renderLoadMoreButton(state);
};

function updateHero({ poster_path, title, vote_average }) {
  const heroImg = document.getElementById("hero-img");
  const heroTitle = document.getElementById("hero-title");
  const heroAverage = document.getElementById("hero-rate");
  const topRatedContainer = document.getElementById("top-rated-container");

  let url = `https://image.tmdb.org/t/p/original${poster_path}`;
  if (!poster_path) url = "images/fallback.png";
  if (heroImg) heroImg.src = url;
  const img = document.getElementById("hero-img");
  const heroSkeleton = document.getElementById("hero-skeleton");
  img.addEventListener("load", () => {
    hideElement(heroSkeleton);
    if (heroAverage) heroAverage.innerText = vote_average;
    if (heroTitle) heroTitle.innerText = title;
    showElement(topRatedContainer);
  });
}

const main = async () => {
  Object.assign(state, initState());
  try {
    const data = await fetchAndSetLoadingEvent(state);
    renderApp(data);
  } catch (error) {
    handleSearchError(error);
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
function handleSearchError(error: Error): void {
  const $hero = document.getElementById("hero");
  const $thumbnailContainer = document.getElementById("thumbnail-container");
  const $fallback = document.getElementById("fallback");
  const $fallbackDetails = document.getElementById("fallback-details");

  hideElement($hero);
  hideElement($thumbnailContainer);
  showElement($fallback);
  $fallbackDetails.innerText =
    "뭔가 잘못되었어요. 인터넷 상태를 체크하신뒤 세로 고침을 해주세요!";
}

main();
