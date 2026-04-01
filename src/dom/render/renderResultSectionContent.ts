import { Movie } from "../../apis/movie/api";

export const renderResultSectionContent = (
  isLoading: boolean,
  isError: boolean,
  movies: Movie[],
) => {
  const skeletonList = document.getElementById("skeleton-list");
  const errorContainer = document.getElementById("error-container");
  const thumbnailList = document.getElementById("thumbnail-list");
  const emptyContainer = document.getElementById("empty-container");

  skeletonList?.classList.add("hidden");
  errorContainer?.classList.add("hidden");
  thumbnailList?.classList.add("hidden");
  emptyContainer?.classList.add("hidden");

  if (isLoading) {
    skeletonList?.classList.remove("hidden");
    return;
  }

  if (isError) {
    errorContainer?.classList.remove("hidden");
    return;
  }

  if (movies.length > 0) {
    thumbnailList?.classList.remove("hidden");
    return;
  }

  emptyContainer?.classList.remove("hidden");
};
