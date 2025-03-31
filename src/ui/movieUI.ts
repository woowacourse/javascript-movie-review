import Title from "../components/Title";
import CardList from "../components/CardList";
import Skeleton from "../components/Skeleton";
import { createElement } from "../utils/dom";
import { getState } from "../store/movieStore";
import { observer } from "./infiniteScroll.ts";

export const renderTitle = ($container: HTMLElement) => {
  const movieSectionTitle = Title({ text: "지금 인기 있는 영화" });
  $container.appendChild(movieSectionTitle);
};

export const renderMovies = ($main: HTMLElement) => {
  const state = getState();
  $main.innerHTML = "";

  if (state.query) {
    const searchedMovieTitle = Title({
      text: `"${state.query}" 검색 결과`,
    });
    searchedMovieTitle.classList.add("search-result-title");
    $main.appendChild(searchedMovieTitle);
  } else {
    renderTitle($main);
  }

  if (state.list.length === 0 && !state.isLoading) {
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

  if (state.isLoading) {
    Skeleton.render($main);
  }

  const $sentinel = createElement("div", { id: "scroll-sentinel" });
  $main.appendChild($sentinel);

  observer.observe($sentinel);
};
