import Header from "../components/header/header";
import Hero from "../components/hero/hero";
import Button from "../components/button/button";
import MovieItem from "../components/moveItem/movieItem";
import type { Result } from "../../types/tmdb.types";
import { createElementsFragment } from "../util/dom";
import type { StateTypes } from "../state/state";
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

function renderMovieItems(results: Result[], reset?: boolean) {
  const $list = document.getElementById("thumbnail-list");
  if (reset && $list) $list.innerHTML = "";

  const movieItems = results.map((result: Result) => {
    const { title, poster_path, vote_average } = result;
    return MovieItem({
      title,
      src: poster_path,
      rate: vote_average,
      onload: hideImgSkeleton,
    });
  });

  $list?.appendChild(createElementsFragment(movieItems));
}

async function handleMovieList(
  loadMovies: () => Promise<{ results: Result[]; isLastPage: boolean }>,
  reset?: boolean
) {
  const skeleton = document.querySelector(".skeleton-list");
  const loadMore = document.getElementById("load-more");

  showElement(skeleton);
  hideElement(loadMore);

  const { results, isLastPage } = await loadMovies();

  showElement(loadMore);
  hideElement(skeleton);

  if (isLastPage) hideElement(loadMore);

  renderMovieItems(results, reset);
}

export async function renderMovieList(
  loadMovies: () => Promise<{ results: Result[]; isLastPage: boolean }>,
  reset?: boolean
) {
  await handleMovieList(loadMovies, reset);
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
      onClick: () => {
        if (state.loadMovies) renderMovieList(state.loadMovies);
      },
    });
    $thumbnailContainer.append(loadMoreButton);
  }
}
