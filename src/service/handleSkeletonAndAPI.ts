/* eslint-disable max-lines-per-function */

import apiClient from "../model/APIClient";

const toggleErrorView = (isShow: boolean) => {
  if (isShow) {
    const $itemView = document.querySelector(".item-view");
    $itemView?.remove();
  }
  const $errorView = document.querySelector(".error-view");
  $errorView?.classList.toggle("on", isShow);
};

export const handleGetSearchMovieData = async (
  isResetCurrentPage: boolean,
  title: string,
) => {
  const $skeletonView = document.querySelector(".skeleton-view");

  setTimeout(() => toggleErrorView(false), 1000);
  try {
    $skeletonView?.classList.add("on");
    await apiClient.getSearchMovieData(isResetCurrentPage, title);
    toggleErrorView(false);
  } catch (error) {
    toggleErrorView(true);
  }

  setTimeout(() => {
    $skeletonView?.classList.remove("on");
  }, 500);
};

export const handleGetPopularMovieData = async () => {
  const $skeletonView = document.querySelector(".skeleton-view");
  try {
    $skeletonView?.classList.add("on");
    await apiClient.getPopularMovieData(false);
    toggleErrorView(false);
  } catch (error) {
    toggleErrorView(true);
  }

  setTimeout(() => {
    $skeletonView?.classList.remove("on");
  }, 500);
};
