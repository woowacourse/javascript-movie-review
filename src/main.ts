/// <reference types="vite/client" />

import createMovieLoader from "./service/createMovieLoader";
import { createElementsFragment } from "./util/dom";
import { URLS, defaultOptions, defaultQueryObject } from "./setting/settings";
import MovieItem from "./components/moveItem/movieItem";
import Header from "./components/header/Header";
import Hero from "./components/hero/hero";
import type { Result } from "../types/TMDB";
import Button from "./components/button/button";
import Toast from "./components/Toast/Toast";
import { showSkeleton, hideSkeleton } from "./view/skeleton";

let loadMovies = createMovieLoader(
  URLS.popularMovieUrl,
  defaultQueryObject,
  defaultOptions
);

async function init() {
  createMovieList(loadMovies);

  const $wrap = document.querySelector("#wrap");

  $wrap?.prepend(Header());

  $wrap?.prepend(Hero());

  const $main = document.querySelector(".main");
  const loadMoreButton = Button({
    className: ["primary", "width-100"],
    placeholder: "더보기",
    id: "load-more",
    onClick: () => createMovieList(loadMovies),
  });
  const inputForm = document.querySelector(".input-form");
  inputForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(inputForm);
    const searchValue = formData.get("search-bar");

    handleSearch(searchValue);
  });

  const $logo = document.querySelector(".logo");
  $logo?.addEventListener("click", handleLogoClick);

  $main?.append(loadMoreButton);
}

function addMovies(results: Result[], reset?: boolean) {
  const $list = document.querySelector("#thumbnail-list");

  if (reset && $list) $list.innerHTML = "";

  const movieItems = results.map((result: Result) => {
    const { title, poster_path, vote_average } = result;
    const movieItem = MovieItem({
      title,
      src: poster_path,
      rate: vote_average,
    });
    return movieItem;
  });

  $list?.appendChild(createElementsFragment(movieItems));
}

async function handleLogoClick() {
  location.reload();
}

async function createMovieList(
  loadMovies: () => Promise<{ results: Result[]; isLastPage: boolean }>,
  reset?: boolean
) {
  showSkeleton();
  const { results, isLastPage } = await loadMovies();

  hideSkeleton();

  if (isLastPage) {
    document.getElementById("load-more")?.classList.add("hide");
  }
  addMovies(results, reset);
}

async function handleSearch(searchValue: string) {
  updateSearchDescription(searchValue);
  prepareUIForSearch();

  try {
    const loadMovies = createMovieLoader(
      URLS.searchMovieUrl,
      defaultQueryObject,
      defaultOptions,
      searchValue
    );

    await createMovieList(loadMovies, true);
    finalizeUISuccess();
  } catch (error: any) {
    handleSearchError(error);
  }
}

function updateSearchDescription(searchValue: string): void {
  const description = document.getElementById("description");
  if (description) {
    description.textContent = `"${searchValue}" 검색 결과`;
  }
}

function prepareUIForSearch(): void {
  const fallbackDiv = document.getElementById("fallback-div");
  fallbackDiv?.classList.add("hide");

  const hero = document.getElementById("hero");
  hero?.classList.add("hide");

  const loadMore = document.querySelector("#load-more");
  loadMore?.classList.remove("hide");

  const thumbnailList = document.querySelector("#thumbnail-list");
  thumbnailList?.classList.add("hide");
  const movies = document.querySelector(".movies");
  movies?.classList.remove("hide");
}

function finalizeUISuccess(): void {
  const movies = document.querySelector(".movies");
  movies?.classList.remove("hide");

  const thumbnailList = document.querySelector("#thumbnail-list");
  thumbnailList?.classList.remove("hide");
}

function handleSearchError(error: any): void {
  const movies = document.querySelector(".movies");
  movies?.classList.add("hide");

  Toast.showToast(error.message, "error", 5000);

  const loadMore = document.querySelector("#load-more");
  loadMore?.classList.add("hide");

  const fallbackDiv = document.getElementById("fallback-div");
  fallbackDiv?.classList.remove("hide");
}

await init();
