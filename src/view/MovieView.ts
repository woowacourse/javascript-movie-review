import Header from "../components/header/header";
import Hero from "../components/hero/hero";
import Button from "../components/button/button";
import MovieItem from "../components/moveItem/movieItem";
import type { Result } from "../../types/TMDB";
import { createElementsFragment } from "../util/dom";

export function showElement(element: Element | null) {
  element?.classList.remove("hide");
}

export function hideElement(element: Element | null) {
  element?.classList.add("hide");
}

export function hideImgSkeleton(event: Event) {
  const img = event.target;
  if (img) showElement(img);

  const skeleton = img.parentElement.parentElement.querySelector(
    ".skeleton-thumbnail"
  );
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

export function renderLoadMoreButton(state: { loadMovies: any }) {
  const $thumbnailContainer = document.getElementById("thumbnail-container");
  if ($thumbnailContainer) {
    const loadMoreButton = Button({
      className: ["primary", "width-100"],
      placeholder: "더보기",
      id: "load-more",
      onClick: () => renderMovieList(state.loadMovies),
    });
    $thumbnailContainer.append(loadMoreButton);
  }
}
