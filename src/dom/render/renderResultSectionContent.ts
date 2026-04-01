import { Movie } from "../../apis/movie/api";

interface RenderResultSectionContentProps {
  isLoading: boolean;
  isError: boolean;
  isLastPage: boolean;
  type?: "search" | "main";
  movies: Movie[];
}

// TODO 여기는 DOM이 아닌 type을 전달하는 방식도 괜찮을까?
export const renderResultSectionContent = ({
  isLoading,
  isError,
  isLastPage,
  type = "main",
  movies,
}: RenderResultSectionContentProps) => {
  const skeletonList = document.getElementById("skeleton-list");
  const errorContainer = document.getElementById("error-container");
  const mainThumbnailList = document.getElementById("main-thumbnail-list");
  const searchThumbnailList = document.getElementById("search-thumbnail-list");
  const emptyContainer = document.getElementById("empty-container");
  const seeMoreButton = document.getElementById("main-see-more-button");

  skeletonList?.classList.add("hidden");
  errorContainer?.classList.add("hidden");
  mainThumbnailList?.classList.add("hidden");
  searchThumbnailList?.classList.add("hidden");
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

  if (movies.length > 0 && type === "main") {
    mainThumbnailList?.classList.remove("hidden");
    if (!isLastPage) seeMoreButton?.classList.remove("hidden");
    return;
  }

  if (movies.length > 0 && type === "search") {
    searchThumbnailList?.classList.remove("hidden");
    if (!isLastPage) seeMoreButton?.classList.remove("hidden");
    return;
  }

  emptyContainer?.classList.remove("hidden");
};
