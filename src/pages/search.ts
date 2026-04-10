import { Movie } from "../apis/movie/api.ts";
import { handleSearchSeeMore } from "../dom/eventHandler/handleSeeMore";
import { removeEmptyContainer, renderEmptyContainer } from "../dom/components/EmptyContainer";
import { removeErrorContainer, renderErrorContainer } from "../dom/components/ErrorContainer";
import { removeSearchSeeMoreButton, renderSearchSeeMoreButton } from "../dom/components/SearchSeeMoreButton";
import { removeSearchThumbnailList, renderSearchThumbnailList, renderSearchThumbnailLoading } from "../dom/components/SearchThumbnailList.ts";
import { removeMovieItemsLoading, renderMovieItems } from "../dom/shared/MovieItem.ts";
import { hideBanner } from "../dom/components/Banner";
import { removeMain } from "./home";

export const removeSearch = () => {
  removeSearchThumbnailList();
  removeSearchSeeMoreButton();
  removeErrorContainer();
  removeEmptyContainer();
};

export const renderSearchLoading = (keyword: string) => {
  removeMain();
  removeSearch();
  hideBanner();
  const resultSection = document.getElementById("result-section");
  const subTitle = document.getElementById("sub-title");

  if (resultSection) {
    resultSection.classList.add("result-section");
    renderSearchThumbnailLoading(resultSection);
  }
  if (subTitle) {
    subTitle.innerText = `"${keyword}" 검색 결과`;
  }
};

export const renderSearchError = (errorMessage?: string) => {
  removeMain();
  removeSearch();
  const resultSection = document.getElementById("result-section");
  if (resultSection) {
    renderErrorContainer(
      resultSection,
      errorMessage || "🚨문제가 발생했습니다.🚨",
    );
  }
};

export const renderSearchEmpty = () => {
  removeMain();
  removeSearch();
  const resultSection = document.getElementById("result-section");
  if (resultSection) {
    renderEmptyContainer(resultSection, "검색 결과가 없습니다.");
  }
};

export const renderSearch = (isLastPage: boolean, movies: Movie[]) => {
  const resultSection = document.getElementById("result-section");
  if (!resultSection) return;

  const searchThumbnailList = document.getElementById("search-thumbnail-list");

  if (!searchThumbnailList) {
    removeMain();
    removeSearch(); // Common UI 제거를 위해 호출
    renderSearchThumbnailList(resultSection, movies);
  } else {
    removeMovieItemsLoading(searchThumbnailList as HTMLElement);
    renderMovieItems(searchThumbnailList as HTMLElement, movies);
  }

  if (isLastPage) {
    removeSearchSeeMoreButton();
  } else {
    const url = new URL(window.location.href);
    const keyword = url.searchParams.get("keyword") || "";
    renderSearchSeeMoreButton(resultSection, () => {
      handleSearchSeeMore(keyword);
    });
  }
};
