import { hideElement, showElement } from "../view/InputView";

const $skeletonList = document.querySelector(".skeleton-list");

export function hideSkeleton() {
  hideElement($skeletonList);
}

export function showSkeleton() {
  showElement($skeletonList);
}
