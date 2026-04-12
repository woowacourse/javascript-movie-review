import { Movie } from "../../apis/movie/type.ts";
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

const MAIN_OBSERVER_TARGET_ID = "main-observer-target";
let mainObserver: IntersectionObserver | null = null;
let mainObserverTarget: HTMLElement | null = null;

export const renderHome = (isLastPage: boolean, movies: Movie[]) => {
  removeHome();
  removeSearch();

  const header = document.querySelector("header");
  if (header) {
    renderBanner(header, movies[0]);
  }

  const resultSection = document.getElementById("result-section");
  if (!resultSection) return;

  renderMainThumbnailList(resultSection, movies);

  if (!isLastPage) {
    observeTarget(resultSection, () => {
      handleMainSeeMore();
    });
  }
};

export const renderHomeLoading = () => {
  removeHome();
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

export const renderHomeError = (errorMessage?: string) => {
  removeHome();
  removeSearch();

  const resultSection = document.getElementById("result-section");
  if (resultSection) {
    renderErrorContainer(
      resultSection,
      errorMessage || "🚨문제가 발생했습니다.🚨",
    );
  }
};

export const renderHomeEmpty = () => {
  removeHome();
  removeSearch();

  const resultSection = document.getElementById("result-section");
  if (resultSection) {
    renderEmptyContainer(resultSection, "검색 결과가 없습니다.");
  }
};

export const appendPopularMovies = (isLastPage: boolean, movies: Movie[]) => {
  const resultSection = document.getElementById("result-section");
  const mainThumbnailList = document.getElementById("main-thumbnail-list");
  if (!resultSection || !mainThumbnailList) return;

  removeObserverTarget();
  removeMovieItemsLoading(mainThumbnailList as HTMLElement);
  renderMovieItems(mainThumbnailList as HTMLElement, movies);

  if (!isLastPage) {
    observeTarget(resultSection, () => {
      handleMainSeeMore();
    });
  }
};

export const removeHome = () => {
  mainObserver?.disconnect();
  mainObserver = null;
  removeObserverTarget();
  removeBanner();
  removeMainThumbnailList();
  removeErrorContainer();
  removeEmptyContainer();
};

const observeTarget = (parent: HTMLElement, onIntersect: () => void) => {
  mainObserver?.disconnect();

  parent.insertAdjacentHTML(
    "beforeend",
    `<div id="${MAIN_OBSERVER_TARGET_ID}" class="observer-target"></div>`,
  );
  mainObserverTarget = document.getElementById(MAIN_OBSERVER_TARGET_ID);
  if (!mainObserverTarget) return;

  mainObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        mainObserver?.disconnect();
        onIntersect();
      }
    },
    {
      rootMargin: "400px",
      threshold: 0.1,
    },
  );
  mainObserver.observe(mainObserverTarget);
};

const removeObserverTarget = () => {
  mainObserverTarget?.remove();
  mainObserverTarget = null;
};
