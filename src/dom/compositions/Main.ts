import { Movie } from "../../apis/movie/api.ts";
import { handleMainSeeMore } from "../eventHandler/handleSeeMore.ts";
import {
  removeEmptyContainer,
  renderEmptyContainer,
} from "../components/EmptyContainer.ts";
import {
  removeErrorContainer,
  renderErrorContainer,
} from "../components/ErrorContainer.ts";
import {
  removeMainSeeMoreButton,
  renderMainSeeMoreButton,
} from "../components/MainSeeMoreButton.ts";
import {
  removeMainThumbnailList,
  renderMainThumbnailList,
  renderMainThumbnailLoading,
} from "../components/MainThumbnailList.ts";
import {
  removeMovieItemsLoading,
  renderMovieItems,
} from "../shared/MovieItem.ts";
import { removeBanner, renderBanner } from "../components/Banner.ts";
import { removeSearch } from "./Search.ts";

export const removeMain = () => {
  removeBanner();
  removeMainThumbnailList();
  removeMainSeeMoreButton();
  removeErrorContainer();
  removeEmptyContainer();
};

export const renderMainLoading = () => {
  removeMain();
  removeSearch();

  const header = document.querySelector("header");
  if (header) {
    renderBanner(header);
  }

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
    removeMain();
    removeSearch();

    const header = document.querySelector("header");
    if (header) {
      renderBanner(header);
    }

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
