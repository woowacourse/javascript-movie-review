import { Movie } from "../../apis/movie/api";

interface RenderResultSectionContentProps {
  isLoading: boolean;
  isError: boolean;
  isLastPage?: boolean;
  errorMessage?: string;
  movies: Movie[];
}

export const renderResultSectionContent = ({
  isLoading,
  isError,
  errorMessage,
  isLastPage = true,
  movies,
}: RenderResultSectionContentProps) => {
  const skeletonList = document.getElementById("skeleton-list");
  const errorContainer = document.getElementById("error-container");
  const emptyContainer = document.getElementById("empty-container");

  const errorMessageContent = document.querySelector(
    "#error-container p",
  ) as HTMLParagraphElement;

  const mainThumbnailList = document.getElementById("main-thumbnail-list");
  const mainSeeMoreButton = document.getElementById("main-see-more-button");

  const banner = document.getElementById("background-container");
  const resultSection = document.getElementById("result-section");
  const subTitle = document.getElementById("sub-title");
  const searchThumbnailList = document.getElementById("search-thumbnail-list");
  const searchSeeMoreButton = document.getElementById("search-see-more-button");

  const url = new URL(window.location.href);
  const params = url.searchParams;
  const keyword = params.get("keyword");
  const type = keyword ? "search" : "main";

  skeletonList?.classList.add("hidden");
  errorContainer?.classList.add("hidden");
  emptyContainer?.classList.add("hidden");

  errorMessageContent?.classList.add("hidden");

  mainThumbnailList?.classList.add("hidden");
  mainSeeMoreButton?.classList.add("hidden");
  searchThumbnailList?.classList.add("hidden");
  searchSeeMoreButton?.classList.add("hidden");

  if (isLoading && type === "main") {
    skeletonList?.classList.remove("hidden");
    return;
  }

  if (isLoading && type === "search" && subTitle) {
    banner?.classList.add("hidden");
    resultSection?.classList.add("result-section");
    subTitle.innerText = `"${keyword}" 검색 결과`;
    skeletonList?.classList.remove("hidden");
    return;
  }

  if (isError) {
    errorContainer?.classList.remove("hidden");
    errorMessageContent.innerText = errorMessage || "🚨문제가 발생했습니다.🚨";
    return;
  }

  if (movies.length > 0 && type === "main") {
    mainThumbnailList?.classList.remove("hidden");
    if (!isLastPage) mainSeeMoreButton?.classList.remove("hidden");
    return;
  }

  if (movies.length > 0 && type === "search") {
    searchThumbnailList?.classList.remove("hidden");
    if (!isLastPage) searchSeeMoreButton?.classList.remove("hidden");
    return;
  }

  emptyContainer?.classList.remove("hidden");
};
