import { MOVIE_LENGTH_PER_REQUEST } from "../../constants/movie";
import { $, $$ } from "../../utils/dom";

import "./Skeleton.css";

const createMovieCardSkeleton = (length: number = MOVIE_LENGTH_PER_REQUEST) => {
  return /*html*/ `
    <li id="item-skeleton">
      <div class="item-card">
      <div class="item-thumbnail skeleton"></div>
      <div class="item-title skeleton"></div>
      <div class="item-score skeleton"></div>
    </div>
    </li>`.repeat(length);
};

export const hideSkeleton = () => {
  const skeletonList = $$<HTMLLIElement>("#item-skeleton");

  skeletonList.forEach((element) => {
    element.remove();
  });
};

export const renderSkeleton = () => {
  const movieList = $<HTMLUListElement>("#movie-list-container");

  if (!movieList) return;

  const moveListSkeleton = createMovieCardSkeleton();

  movieList.insertAdjacentHTML("beforeend", moveListSkeleton);
};
