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
  removePopularThumbnailList,
  renderPopularThumbnailList,
  renderPopularThumbnailLoading,
} from "../components/PopularThumbnailList.ts";
import {
  removeMovieItemsLoading,
  renderMovieItems,
} from "../shared/MovieItem.ts";
import { removeBanner, renderBanner } from "../components/Banner.ts";
import { removeSearch } from "./Search.ts";

const HOME_OBSERVER_TARGET_ID = "home-observer-target";
let homeObserver: IntersectionObserver | null = null;
let homeObserverTarget: HTMLElement | null = null;

export const renderHome = (isLastPage: boolean, movies: Movie[]) => {
  removeHome();
  removeSearch();

  const header = document.querySelector("header");
  if (header) {
    renderBanner(header, movies[0]);
  }

  const resultSection = document.getElementById("result-section");
  if (!resultSection) return;

  renderPopularThumbnailList(resultSection, movies);

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
    renderPopularThumbnailLoading(resultSection);
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
  const popularThumbnailList = document.getElementById(
    "popular-thumbnail-list",
  );
  if (!resultSection || !popularThumbnailList) return;

  removeObserverTarget();
  removeMovieItemsLoading(popularThumbnailList as HTMLElement);
  renderMovieItems(popularThumbnailList as HTMLElement, movies);

  if (!isLastPage) {
    observeTarget(resultSection, () => {
      handleMainSeeMore();
    });
  }
};

export const removeHome = () => {
  homeObserver?.disconnect();
  homeObserver = null;
  removeObserverTarget();
  removeBanner();
  removePopularThumbnailList();
  removeErrorContainer();
  removeEmptyContainer();
};

const observeTarget = (parent: HTMLElement, onIntersect: () => void) => {
  homeObserver?.disconnect();

  parent.insertAdjacentHTML(
    "beforeend",
    `<div id="${HOME_OBSERVER_TARGET_ID}" class="observer-target"></div>`,
  );
  homeObserverTarget = document.getElementById(HOME_OBSERVER_TARGET_ID);
  if (!homeObserverTarget) return;

  homeObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        homeObserver?.disconnect();
        onIntersect();
      }
    },
    {
      rootMargin: "400px",
      threshold: 0.1,
    },
  );
  homeObserver.observe(homeObserverTarget);
};

const removeObserverTarget = () => {
  homeObserverTarget?.remove();
  homeObserverTarget = null;
};
