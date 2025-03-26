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
export function updateHero({ poster_path, title, vote_average }) {
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
export function updateDetails({
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
