import { Movie } from "../apis/movie/api.ts";
import { handleMainSeeMore } from "../dom/eventHandler/handleSeeMore";
import { removeEmptyContainer, renderEmptyContainer } from "../dom/components/EmptyContainer";
import { removeErrorContainer, renderErrorContainer } from "../dom/components/ErrorContainer";
import { removeMainSeeMoreButton, renderMainSeeMoreButton } from "../dom/components/MainSeeMoreButton";
import { removeMainThumbnailList, renderMainThumbnailList, renderMainThumbnailLoading } from "../dom/components/MainThumbnailList.ts";
import { removeMovieItemsLoading, renderMovieItems } from "../dom/shared/MovieItem.ts";
import { showBanner } from "../dom/components/Banner";
import { removeSearch } from "./search";

export const removeMain = () => {
  removeMainThumbnailList();
  removeMainSeeMoreButton();
  removeErrorContainer();
  removeEmptyContainer();
};

export const renderMainLoading = () => {
  removeMain();
  removeSearch();
  // TODO: loading 시점에 아직 banner가 렌더링이 안 된 문제
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
    removeMain(); // Common UI 제거를 위해 호출
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
