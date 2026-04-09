import { removeErrorContainer, renderErrorContainer } from "../components/ErrorContainer";

const hideAll = () => {
  const skeletonList = document.getElementById("skeleton-list");
  const emptyContainer = document.getElementById("empty-container");
  const mainThumbnailList = document.getElementById("main-thumbnail-list");
  const mainSeeMoreButton = document.getElementById("main-see-more-button");
  const searchThumbnailList = document.getElementById("search-thumbnail-list");
  const searchSeeMoreButton = document.getElementById("search-see-more-button");

  skeletonList?.classList.add("hidden");
  emptyContainer?.classList.add("hidden");
  mainThumbnailList?.classList.add("hidden");
  mainSeeMoreButton?.classList.add("hidden");
  searchThumbnailList?.classList.add("hidden");
  searchSeeMoreButton?.classList.add("hidden");
  removeErrorContainer();
};

export const renderMainLoading = () => {
  hideAll();
  const skeletonList = document.getElementById("skeleton-list");
  skeletonList?.classList.remove("hidden");
};

export const renderMainError = (errorMessage?: string) => {
  hideAll();
  const resultSection = document.getElementById("result-section");
  if (resultSection) {
    renderErrorContainer(
      resultSection,
      errorMessage || "🚨문제가 발생했습니다.🚨",
    );
  }
};

export const renderMainEmpty = () => {
  hideAll();
  const emptyContainer = document.getElementById("empty-container");
  emptyContainer?.classList.remove("hidden");
};

export const renderMain = (isLastPage: boolean) => {
  hideAll();
  const mainThumbnailList = document.getElementById("main-thumbnail-list");
  const mainSeeMoreButton = document.getElementById("main-see-more-button");
  mainThumbnailList?.classList.remove("hidden");
  if (!isLastPage) mainSeeMoreButton?.classList.remove("hidden");
};

export const renderSearchLoading = (keyword: string) => {
  hideAll();
  const banner = document.getElementById("background-container");
  const resultSection = document.getElementById("result-section");
  const subTitle = document.getElementById("sub-title");
  const skeletonList = document.getElementById("skeleton-list");

  banner?.classList.add("hidden");
  resultSection?.classList.add("result-section");
  if (subTitle) subTitle.innerText = `"${keyword}" 검색 결과`;
  skeletonList?.classList.remove("hidden");
};

export const renderSearchError = (errorMessage?: string) => {
  hideAll();
  const resultSection = document.getElementById("result-section");
  if (resultSection) {
    renderErrorContainer(
      resultSection,
      errorMessage || "🚨문제가 발생했습니다.🚨",
    );
  }
};

export const renderSearchEmpty = () => {
  hideAll();
  const emptyContainer = document.getElementById("empty-container");
  emptyContainer?.classList.remove("hidden");
};

export const renderSearch = (isLastPage: boolean) => {
  hideAll();
  const searchThumbnailList = document.getElementById("search-thumbnail-list");
  const searchSeeMoreButton = document.getElementById("search-see-more-button");
  searchThumbnailList?.classList.remove("hidden");
  if (!isLastPage) searchSeeMoreButton?.classList.remove("hidden");
};
