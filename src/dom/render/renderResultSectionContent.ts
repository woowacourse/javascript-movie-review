import { Movie } from "../../apis/movie/api.ts";
import { handleMainSeeMore, handleSearchSeeMore } from "../eventHandler/handleSeeMore";
import { removeEmptyContainer, renderEmptyContainer } from "../components/EmptyContainer";
import { removeErrorContainer, renderErrorContainer } from "../components/ErrorContainer";
import { removeMainSeeMoreButton, renderMainSeeMoreButton } from "../components/MainSeeMoreButton";
import { removeSearchSeeMoreButton, renderSearchSeeMoreButton } from "../components/SearchSeeMoreButton";
import { removeMainThumbnailList, renderMainThumbnailList, renderMainThumbnailLoading } from "../components/MainThumbnailList.ts";
import { removeSearchThumbnailList, renderSearchThumbnailList, renderSearchThumbnailLoading } from "../components/SearchThumbnailList.ts";
import { removeMovieItemsLoading, renderMovieItems } from "../shared/MovieItem.ts";
import { hideBanner, showBanner } from "../components/Banner";

const removeMain = () => {
  removeMainThumbnailList();
  removeMainSeeMoreButton();
  removeErrorContainer();
  removeEmptyContainer();
};

const removeSearch = () => {
  removeSearchThumbnailList();
  removeSearchSeeMoreButton();
  removeErrorContainer();
  removeEmptyContainer();
};

export const renderMainLoading = () => {
  removeMain();
  removeSearch();
  // TODO: loading 시점에 아직 banner가 렌더링이 안 된 문제
  // -> renderMainUI 로직과 renderMain 함수 둘 중 하나 제거하면 좋을 듯
  showBanner();
  const resultSection = document.getElementById("result-section");
  if (resultSection) {
    renderMainThumbnailLoading(resultSection);
  }
};

export const renderMainError = (errorMessage?: string) => {
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

export const renderMainEmpty = () => {
  removeMain();
  removeSearch();
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
    removeSearch();
    showBanner();
    renderMainThumbnailList(resultSection, movies);
  } else {
    // TODO: mail thumbnail list가 append와 loading remove를 담당하게 하는 게 추상화 레벨이 맞지 않는지
    removeMovieItemsLoading(mainThumbnailList as HTMLElement);
    renderMovieItems(mainThumbnailList as HTMLElement, movies);
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
