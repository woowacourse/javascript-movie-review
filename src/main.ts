/// <reference types="vite/client" />

import createMovieLoader from "./service/createMovieLoader";
import { URLS, defaultOptions, defaultQueryObject } from "./setting/settings";
import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Button from "./components/button/button";
import state from "./state/state.ts";
import createMovieList from "./service/createMovieList";

function init() {
  state.loadMovies = createMovieLoader(
    URLS.popularMovieUrl,
    defaultQueryObject,
    defaultOptions
  );
  setupHeaderAndHero();
  createMovieList(state.loadMovies);
  setupLoadMoreButton();
}

function setupHeaderAndHero() {
  const $wrap = document.getElementById("wrap");
  if ($wrap) {
    $wrap.prepend(Header());
    $wrap.prepend(Hero());
  }
}

function setupLoadMoreButton() {
  const $thumbnailContainer = document.getElementById("thumbnail-container");
  if ($thumbnailContainer) {
    const loadMoreButton = Button({
      className: ["primary", "width-100"],
      placeholder: "더보기",
      id: "load-more",
      onClick: () => createMovieList(state.loadMovies),
    });
    $thumbnailContainer.append(loadMoreButton);
  }
}

init();
