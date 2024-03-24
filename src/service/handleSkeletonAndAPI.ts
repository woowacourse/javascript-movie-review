import { apiClient } from "../model";

const removeSkeletonView = ($skeletonView: Element) => {
  setTimeout(() => {
    $skeletonView?.classList.remove("on");
  }, 500);
};

const handleSkeletonAndAPI = async (apiFun: () => Promise<void>) => {
  const $skeletonView = document.querySelector(".skeleton-view") as Element;
  $skeletonView?.classList.add("on");
  await apiFun();
  removeSkeletonView($skeletonView);
};

export const handleGetPopularMovieData = async (
  isResetCurrentPage: boolean = false,
) => {
  await handleSkeletonAndAPI(() =>
    apiClient.getPopularMovieData(isResetCurrentPage),
  );
};

export const handleGetSearchMovieData = async (
  title: string,
  isResetCurrentPage: boolean,
) => {
  await handleSkeletonAndAPI(() =>
    apiClient.getSearchMovieData(isResetCurrentPage, title),
  );
};
