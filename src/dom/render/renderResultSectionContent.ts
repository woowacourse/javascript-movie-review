import { Movie } from "../../apis/movie/api.ts";
import {
  handleMainSeeMore,
  handleSearchSeeMore,
} from "../eventHandler/handleSeeMore";
import {
  removeEmptyContainer,
  renderEmptyContainer,
} from "../components/EmptyContainer";
import {
  removeErrorContainer,
  renderErrorContainer,
} from "../components/ErrorContainer";
import {
  removeMainSeeMoreButton,
  renderMainSeeMoreButton,
} from "../components/MainSeeMoreButton";
import {
  removeSearchSeeMoreButton,
  renderSearchSeeMoreButton,
} from "../components/SearchSeeMoreButton";
import {
  removeMainThumbnailList,
  renderMainThumbnailList,
} from "../components/MainThumbnailList.ts";
import {
  removeSearchThumbnailList,
  renderSearchThumbnailList,
} from "../components/SearchThumbnailList.ts";
import { renderMovieItems } from "../shared/MovieItem.ts";

const hideAll = () => {
  const skeletonList = document.getElementById("skeleton-list");
  skeletonList?.classList.add("hidden");

  removeErrorContainer();
  removeEmptyContainer();
  removeMainThumbnailList();
  removeSearchThumbnailList();
  removeMainSeeMoreButton();
  removeSearchSeeMoreButton();
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
  const resultSection = document.getElementById("result-section");
  if (resultSection) {
    renderEmptyContainer(resultSection, "검색 결과가 없습니다.");
  }
};

export const renderMain = (isLastPage: boolean, movies: Movie[]) => {
  const resultSection = document.getElementById("result-section");
  if (!resultSection) return;

  const mainThumbnailList = document.getElementById("main-thumbnail-list");

  if (!mainThumbnailList) {
    hideAll();
    renderMainThumbnailList(resultSection, movies);
  } else {
    renderMovieItems(mainThumbnailList, movies);
  }

  if (isLastPage) {
    removeMainSeeMoreButton();
  } else {
    renderMainSeeMoreButton(resultSection, () => {
      handleMainSeeMore();
    });
  }
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
    hideAll();
    renderSearchThumbnailList(resultSection, movies);
  } else {
    renderMovieItems(searchThumbnailList, movies);
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
