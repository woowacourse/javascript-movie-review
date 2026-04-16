import { getPopularMovies } from "../apis/movie/api.ts";
import { Movie } from "../apis/movie/type.ts";
import TMDBError from "../TMDBError.ts";
import { handleMainSeeMore } from "../dom/eventHandler/handleSeeMore.ts";
import { removeEmptyContainer, renderEmptyContainer } from "../dom/components/EmptyContainer.ts";
import { removeErrorContainer, renderErrorContainer } from "../dom/components/ErrorContainer.ts";
import { removePopularThumbnailList, renderPopularThumbnailList, renderPopularThumbnailLoading } from "../dom/components/PopularThumbnailList.ts";
import { removeMovieItemsLoading, renderMovieItems } from "../dom/shared/MovieItem.ts";
import { removeBanner, renderBanner } from "../dom/components/Banner.ts";

const HOME_OBSERVER_TARGET_ID = "home-observer-target";
let homeObserver: IntersectionObserver | null = null;
let homeObserverTarget: HTMLElement | null = null;

export const renderHomePage = async (type: "init" | "append") => {
  let isError = false;
  let isLastPage = true;
  let movies: Movie[] = [];
  let errorMessage = "";

  const page = Number(sessionStorage.getItem("page") || 1);

  try {
    if (type === "init") {
      renderHomeLoading();
    }

    const popularMovies = await getPopularMovies({
      language: "ko-KR",
      page,
    });
    isLastPage = popularMovies.page === popularMovies.total_pages;
    movies = popularMovies.results;
  } catch (error) {
    isError = true;
    errorMessage = "🚨알 수 없는 에러가 발생했습니다.🚨";
    if (error instanceof TMDBError) {
      errorMessage = "🚨TMDB에서 데이터를 불러오는 중 에러가 발생했습니다🚨";
    }
  } finally {
    if (type === "init") {
      if (isError) {
        renderHomeError(errorMessage);
      } else if (movies.length === 0) {
        renderHomeEmpty();
      } else if (type === "init") {
        renderHomeSuccess(isLastPage, movies);
      }
    }

    if (type === "append") {
      if (isError) {
        window.alert(errorMessage);
      } else {
        appendPopularMovies(isLastPage, movies);
      }
    }
  }
};

const renderHomeSuccess = (isLastPage: boolean, movies: Movie[]) => {
  removeHome();

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

const renderHomeLoading = () => {
  removeHome();

  const header = document.querySelector("header");
  if (header) {
    renderBanner(header);
  }

  const resultSection = document.getElementById("result-section");
  if (resultSection) {
    renderPopularThumbnailLoading(resultSection);
  }
};

const renderHomeError = (errorMessage?: string) => {
  removeHome();

  const resultSection = document.getElementById("result-section");
  if (resultSection) {
    renderErrorContainer(
      resultSection,
      errorMessage || "🚨문제가 발생했습니다.🚨",
    );
  }
};

const renderHomeEmpty = () => {
  removeHome();

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
