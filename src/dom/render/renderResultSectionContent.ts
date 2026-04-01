import { Movie } from "../../apis/movie/api";

interface RenderResultSectionContentProps {
  isLoading: boolean;
  isError: boolean;
  isLastPage: boolean;
  movies: Movie[];
}

export const renderResultSectionContent = ({
  isLoading,
  isError,
  isLastPage,
  movies,
}: RenderResultSectionContentProps) => {
  const skeletonList = document.getElementById("skeleton-list");
  const errorContainer = document.getElementById("error-container");
  const thumbnailList = document.getElementById("thumbnail-list");
  const emptyContainer = document.getElementById("empty-container");
  const seeMoreButton = document.getElementById("see-more-button");

  skeletonList?.classList.add("hidden");
  errorContainer?.classList.add("hidden");
  thumbnailList?.classList.add("hidden");
  emptyContainer?.classList.add("hidden");
  seeMoreButton?.classList.add("hidden");

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
    if (!isLastPage) seeMoreButton?.classList.remove("hidden");
    return;
  }

  emptyContainer?.classList.remove("hidden");
};
