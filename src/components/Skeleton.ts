import { $, createElement } from "../utils/dom";

export const hideSkeleton = () => {
  const skeletonList = $<HTMLUListElement>("#skeleton-list");
  skeletonList && skeletonList.parentNode?.removeChild(skeletonList);
};

export const renderSkeleton = () => {
  const movieList = $<HTMLUListElement>("#movie-list-container");
  const skeletonList = createElement<HTMLUListElement>("ul");
  skeletonList.id = "skeleton-list";
  skeletonList.className = "item-list";
  skeletonList.innerHTML = getSkeletonUI();

  movieList && movieList.appendChild(skeletonList);
};

export const getSkeletonUI = (length: number = 20) => {
  return /*html*/ `
    <li class="item-skeleton">
      <a href="#">
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <div class="item-title skeleton"></div>
          <div class="item-score skeleton"></div>
        </div>
      </a>
    </li>`.repeat(length);
};
