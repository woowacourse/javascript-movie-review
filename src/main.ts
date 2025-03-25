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

import { fetchUrl } from "./util/fetch.ts";
import type { TMDBDetails } from "../types/tmdb.types.ts";

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
document
  .getElementById("thumbnail-list")
  ?.addEventListener("click", ({ target }) => {
    const { id } = target?.closest("li") ?? {};
    if (id) {
      handleItemClick(id);
    }
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

function updateDetails({
  poster_path,
  release_date,
  overview,
  title,
  vote_average,
  genres,
}) {
  const detailsImage = document.getElementById("details-image");
  const detailsTitle = document.getElementById("details-title");
  const detailsCategory = document.getElementById("details-category");
  const detailsRate = document.getElementById("details-rate");
  const detailsDescription = document.getElementById("details-description");
  const categoryNames = `${new Date(release_date).getFullYear()} ${genres
    .map((genre) => genre.name)
    .join(", ")} `;
  let imgUrl = "./images/fallback_no_movies.png";
  if (poster_path) imgUrl = "https://image.tmdb.org/t/p/original" + poster_path;

  detailsTitle.innerText = title;
  detailsRate.innerText = vote_average;
  detailsCategory.innerText = categoryNames;
  detailsDescription.innerText = overview;
  detailsImage.src = imgUrl;
}

document.getElementById("details-image").addEventListener("load", () => {
  const skeleton = document.getElementById("details-skeleton");
  const detailsImage = document.getElementById("details-image");
  hideElement(skeleton);
  showElement(detailsImage);
});

document.getElementById("closeModal").addEventListener("click", () => {
  const modal = document.getElementById("modal-dialog");
  modal.close();
});
main();

export { infiniteScrollInstance };
