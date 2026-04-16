import { Movie } from "../apis/movie/type.ts";
import { getSearchedMovies } from "../apis/search/api.ts";
import TMDBError from "../TMDBError.ts";
import { handleSearchSeeMore } from "../dom/eventHandler/handleSeeMore.ts";
import {
  removeEmptyContainer,
  renderEmptyContainer,
} from "../dom/components/EmptyContainer.ts";
import {
  removeErrorContainer,
  renderErrorContainer,
} from "../dom/components/ErrorContainer.ts";
import {
  removeSearchThumbnailList,
  renderSearchThumbnailList,
  renderSearchThumbnailLoading,
} from "../dom/components/SearchThumbnailList.ts";
import {
  removeMovieItemsLoading,
  renderMovieItems,
} from "../dom/shared/MovieItem.ts";

const SEARCH_OBSERVER_TARGET_ID = "search-observer-target";
let searchObserver: IntersectionObserver | null = null;
let searchObserverTarget: HTMLElement | null = null;

export const renderSearchPage = async (type: "init" | "append") => {
  let isError = false;
  let isLastPage = true;
  let movies: Movie[] = [];
  let errorMessage = "";

  const keyword =
    new URLSearchParams(window.location.search).get("keyword") || "";
  const page = Number(sessionStorage.getItem("page") || 1);
  if (keyword.trim() === "") return;

  const searchInput = document.getElementById(
    "search-input",
  ) as HTMLInputElement;

  if (searchInput) {
    searchInput.value = keyword;
  }

  try {
    if (type === "init") {
      renderSearchLoading(keyword);
    }

    const searchResult = await getSearchedMovies({
      query: keyword,
      language: "ko-KR",
      page,
    });

    isLastPage = searchResult.page === searchResult.total_pages;
    movies = searchResult.results;
  } catch (error) {
    isError = true;
    errorMessage = "🚨알 수 없는 에러가 발생했습니다.🚨";
    if (error instanceof TMDBError) {
      errorMessage = "🚨TMDB에서 데이터를 불러오는 중 에러가 발생했습니다🚨";
    }
  } finally {
    if (type === "init") {
      if (isError) {
        renderSearchError(errorMessage);
      } else if (movies.length === 0) {
        renderSearchEmpty();
      } else if (type === "init") {
        renderSearchSuccess(isLastPage, movies);
      }
    }

    if (type === "append") {
      if (isError) {
        window.alert(errorMessage);
      } else {
        appendSearchedMovies(isLastPage, movies);
      }
    }
  }
};

const renderSearchSuccess = (isLastPage: boolean, movies: Movie[]) => {
  removeSearch();

  const resultSection = document.getElementById("result-section");
  if (!resultSection) return;

  renderSearchThumbnailList(resultSection, movies);

  if (!isLastPage) {
    observeTarget(resultSection, () => {
      handleSearchSeeMore();
    });
  }
};

const renderSearchLoading = (keyword: string) => {
  removeSearch();

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

const renderSearchError = (errorMessage?: string) => {
  removeSearch();

  const resultSection = document.getElementById("result-section");
  if (resultSection) {
    renderErrorContainer(
      resultSection,
      errorMessage || "🚨문제가 발생했습니다.🚨",
    );
  }
};

const renderSearchEmpty = () => {
  removeSearch();

  const resultSection = document.getElementById("result-section");
  if (resultSection) {
    renderEmptyContainer(resultSection, "검색 결과가 없습니다.");
  }
};

export const appendSearchedMovies = (isLastPage: boolean, movies: Movie[]) => {
  const resultSection = document.getElementById("result-section");
  const searchThumbnailList = document.getElementById("search-thumbnail-list");
  if (!resultSection || !searchThumbnailList) return;

  removeObserverTarget();
  removeMovieItemsLoading(searchThumbnailList as HTMLElement);
  renderMovieItems(searchThumbnailList as HTMLElement, movies);

  if (!isLastPage) {
    observeTarget(resultSection, () => {
      handleSearchSeeMore();
    });
  }
};

export const removeSearch = () => {
  searchObserver?.disconnect();
  searchObserver = null;
  removeObserverTarget();
  removeSearchThumbnailList();
  removeErrorContainer();
  removeEmptyContainer();
};

const observeTarget = (parent: HTMLElement, onIntersect: () => void) => {
  searchObserver?.disconnect();

  parent.insertAdjacentHTML(
    "beforeend",
    `<div id="${SEARCH_OBSERVER_TARGET_ID}" class="observer-target"></div>`,
  );
  searchObserverTarget = document.getElementById(SEARCH_OBSERVER_TARGET_ID);
  if (!searchObserverTarget) return;

  searchObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        searchObserver?.disconnect();
        onIntersect();
      }
    },
    {
      rootMargin: "400px",
      threshold: 0.1,
    },
  );
  searchObserver.observe(searchObserverTarget);
};

const removeObserverTarget = () => {
  searchObserverTarget?.remove();
  searchObserverTarget = null;
};
