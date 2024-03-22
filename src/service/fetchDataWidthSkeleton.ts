import ErrorView from "../components/ErrorView";
import { apiClient } from "../model";

const showErrorView = (error: unknown) => {
  if (error instanceof Error) {
    document.querySelector(".item-view")?.remove();
    ErrorView(error.message);
  }
};

const removeSkeletonView = ($skeletonView: Element) => {
  $skeletonView?.classList.remove("on");
  setTimeout(() => {
    $skeletonView?.classList.remove("on");
  }, 500);
};

const fetchDataWidthSkeleton = async (apiFun: () => Promise<void>) => {
  const $skeletonView = document.querySelector(".skeleton-view") as Element;
  try {
    $skeletonView?.classList.add("on");
    await apiFun();
    document.querySelector(".error-view")?.remove();
  } catch (error) {
    showErrorView(error);
  }
  removeSkeletonView($skeletonView);
};

export const handleGetPopularMovieData = async (
  isResetCurrentPage: boolean = false,
) => {
  await fetchDataWidthSkeleton(() =>
    apiClient.getPopularMovieData(isResetCurrentPage),
  );
};

export const handleGetSearchMovieData = async (
  title: string,
  isResetCurrentPage: boolean,
) => {
  await fetchDataWidthSkeleton(() =>
    apiClient.getSearchMovieData(isResetCurrentPage, title),
  );
};
