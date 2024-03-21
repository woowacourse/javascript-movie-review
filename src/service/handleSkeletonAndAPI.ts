import { apiClient } from "../model";

const toggleErrorView = (isShow: boolean) => {
  if (isShow) {
    const $itemView = document.querySelector(".item-view");
    $itemView?.remove();
  }
  const $errorView = document.querySelector(".error-view");
  $errorView?.classList.toggle("on", isShow);
};

const removeSkeletonView = ($skeletonView: Element) => {
  setTimeout(() => {
    $skeletonView?.classList.remove("on");
  }, 500);
};

const handleSkeletonAndAPI = async (apiFun: () => Promise<void>) => {
  const $skeletonView = document.querySelector(".skeleton-view") as Element;
  try {
    $skeletonView?.classList.add("on");
    await apiFun();
    toggleErrorView(false);
  } catch (error) {
    toggleErrorView(true);
  }
  removeSkeletonView($skeletonView);
};

export const handleGetPopularMovieData = async () => {
  await handleSkeletonAndAPI(() => apiClient.getPopularMovieData(false));
};

export const handleGetSearchMovieData = async (
  title: string,
  isResetCurrentPage: boolean,
) => {
  await handleSkeletonAndAPI(() =>
    apiClient.getSearchMovieData(isResetCurrentPage, title),
  );
};
