import { Movie } from "../../apis/movie/api";

interface RenderResultSectionContentProps {
  isLoading: boolean;
  isError: boolean;
  isLastPage?: boolean;
  type?: "search" | "main";
  movies: Movie[];
}

// TODO 여기는 DOM이 아닌 type을 전달하는 방식도 괜찮을까?
// 라바: 필요한 돔은 내부에서 가져오고 조작하는 함수라고 생각되는데, 만약 type에 따라 dom을 조건부로 다루는 방식이 아니라면
//      isLoading과 isError,,,도 loading dom, error dom으로 처리??
export const renderResultSectionContent = ({
  isLoading,
  isError,
  isLastPage = true,
  movies,
}: RenderResultSectionContentProps) => {
  const skeletonList = document.getElementById("skeleton-list");
  const errorContainer = document.getElementById("error-container");
  const emptyContainer = document.getElementById("empty-container");

  const mainThumbnailList = document.getElementById("main-thumbnail-list");
  const mainSeeMoreButton = document.getElementById("main-see-more-button");

  const searchThumbnailList = document.getElementById("search-thumbnail-list");
  const searchSeeMoreButton = document.getElementById("search-see-more-button");

  const url = new URL(window.location.href);
  const params = url.searchParams;
  const keyword = params.get("keyword");
  const type = keyword ? "search" : "main";

  skeletonList?.classList.add("hidden");
  errorContainer?.classList.add("hidden");
  mainThumbnailList?.classList.add("hidden");
  searchThumbnailList?.classList.add("hidden");
  emptyContainer?.classList.add("hidden");
  mainSeeMoreButton?.classList.add("hidden");

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
