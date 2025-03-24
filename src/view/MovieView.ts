import Header from "../components/header/header";
import Hero from "../components/hero/hero";
import Button from "../components/button/button";
import MovieItem from "../components/moveItem/movieItem";
import type { Result } from "../../types/tmdb.types";
import { createElementsFragment } from "../util/dom";
import type { StateTypes } from "../state/state";

import fetchAndSetLoadingEvent from "../service/fetchService";

export function showElement(element: Element | null) {
  element?.classList.remove("hide");
}

export function hideElement(element: Element | null) {
  element?.classList.add("hide");
}

export function hideImgSkeleton(event: Event) {
  const img = event.target as HTMLElement;
  if (!img) return;

  showElement(img);

  const skeleton = img.parentElement?.parentElement?.querySelector(
    ".skeleton-thumbnail"
  );

  // 아.. 타입 정말.. 타입 가드를 너무 빡빡히 주네요.
  // 충분히 가드를 하고 있다고 생각하는데,
  // 타입스크립트는 마음에 안드나 봅니다.

  skeleton?.remove();
}

export function renderMovieItems(results: Result[], reset?: boolean) {
  const $list = document.getElementById("thumbnail-list");
  if (reset && $list) $list.innerHTML = "";

  const movieItems = results.map((result: Result) => {
    const { id, title, poster_path, vote_average } = result;
    return MovieItem({
      id,
      title,
      src: poster_path,
      rate: vote_average,
      onload: hideImgSkeleton,
    });
  });

  $list?.appendChild(createElementsFragment(movieItems));
}

export function renderHeaderAndHero() {
  const $wrap = document.getElementById("wrap");
  if ($wrap) {
    $wrap.prepend(Header());
    $wrap.prepend(Hero());
  }
}

export function renderLoadMoreButton(state: StateTypes) {
  const $thumbnailContainer = document.getElementById("thumbnail-container");

  if ($thumbnailContainer) {
    const loadMoreButton = Button({
      className: ["primary", "width-100"],
      placeholder: "더보기",
      id: "load-more",
      onClick: async () => {
        const data = await fetchAndSetLoadingEvent(state);
        renderMovieItems(data.results, false);
      },
    });
    $thumbnailContainer.append(loadMoreButton);
  }
}
