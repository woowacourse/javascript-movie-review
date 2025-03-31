import Title from "../components/Title";
import CardList from "../components/CardList";
import Skeleton from "../components/Skeleton";
import { createElement, $ } from "../utils/dom";
import { getState } from "../store/movieStore";
import { scrollObserver } from "./infiniteScroll.ts";

export const renderTitle = ($container: HTMLElement) => {
  const movieSectionTitle = Title({ text: "지금 인기 있는 영화" });
  $container.appendChild(movieSectionTitle);
};

export const renderMovies = ($main: HTMLElement) => {
  const state = getState();
  $main.innerHTML = "";

  if (state.isLoading) {
    Skeleton.render($main);
    return;
  }

  if (state.query) {
    const searchedMovieTitle = Title({
      text: `"${state.query}" 검색 결과`,
    });
    searchedMovieTitle.classList.add("search-result-title");
    $main.appendChild(searchedMovieTitle);
  } else {
    renderTitle($main);
  }

  if (state.list.length === 0) {
    const emptySection = createElement("section", {
      class: ["empty-container"],
      innerHTML: `<img src="images/empty_logo.png" alt="우아한테크코스 로고" />
                  <h2 class="empty-content">검색 결과가 없습니다.</h2>`,
    });
    $main.appendChild(emptySection);
    return;
  }

  CardList({
    items: state.list,
    el: $main,
  });

  const $loadTrigger = createElement("div", { id: "load-trigger" });
  $main.appendChild($loadTrigger);

  scrollObserver.observe($loadTrigger);
};

export const loadMoreMovies = ($main: HTMLElement) => {
  const state = getState();

  const $existingLoadTrigger = $("#load-trigger");
  if ($existingLoadTrigger) {
    $existingLoadTrigger.remove();
  }

  if (state.isLoading) {
    const $loadingMore = createElement("div", {
      id: "loading-more",
    });

    $main.appendChild($loadingMore);
    Skeleton.render($loadingMore);

    return;
  } else {
    $("#loading-more")?.remove();
  }

  if (state.currentPage <= 1) {
    renderMovies($main);
    return;
  }

  const totalItems = state.list.length;
  const itemsPerPage = Math.ceil(totalItems / state.currentPage);
  const startIndex = Math.max(0, totalItems - itemsPerPage);

  const newItems = state.list.slice(startIndex);

  CardList({
    items: newItems,
    el: $main,
    isAppend: true,
  });

  const $loadTrigger = createElement("div", { id: "load-trigger" });
  $main.appendChild($loadTrigger);

  scrollObserver.observe($loadTrigger);
};
