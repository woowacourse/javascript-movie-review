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
  showElement,
} from "./view/MovieView.ts";

import { hideElement } from "./view/MovieView.ts";

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

const renderApp = async (state: StateTypes) => {
  if (!state.loadMovies) return;
  renderHeaderAndHero();
  await renderMovieList(state.loadMovies, { init: true, reset: false });
  if (state.heroMovie) updateHero(state.heroMovie);
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
  await renderApp(state);
};

main();
