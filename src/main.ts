import { navigate, getSearchParams, hasSearchParams } from "./utils/router";

import {
  ApiError,
  getPopularMovies,
  getTopRatedMovies,
  getSearchMovies,
} from "./services/api";

import {
  renderTopRatedMovie,
  removeTopRatedMovie,
} from "./renders/topRatedMovie";
import {
  renderMovieList,
  renderNoResult,
  removeMovieList,
} from "./renders/movieList";
import { renderSkeleton, removeSkeleton } from "./renders/skeleton";
import PageState from "./states/PageState";
import { updateMoreButton } from "./renders/moreButton";
import { baseUrl } from "./constants/env";

const popularPageState = new PageState();
const searchPageState = new PageState();

const showErrorAlert = (error: unknown) => {
  if (error instanceof ApiError && error.status_code === 22) {
    alert("잘못된 페이지 요청입니다.");
    return;
  }

  alert("영화 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
};

const loadTopRatedMovie = async () => {
  try {
    const topRatedMovies = await getTopRatedMovies();
    const topRatedMovie = topRatedMovies.results[0];

    if (!topRatedMovie) return;

    renderTopRatedMovie(topRatedMovie);
  } catch (e) {
    showErrorAlert(e);
  }
};

const loadPopularMovies = async () => {
  try {
    renderSkeleton();
    const page = popularPageState.getPage() + 1;
    const movies = await getPopularMovies({ page });

    if (movies) {
      renderMovieList(movies);
      updateMoreButton(movies.page, movies.total_pages);
      popularPageState.incrementPage();
    }
  } catch (e) {
    showErrorAlert(e);
  } finally {
    removeSkeleton();
  }
};

const loadSearchMovies = async () => {
  try {
    const search = getSearchParams("search") as string;

    const page = searchPageState.getPage() + 1;
    const movies = await getSearchMovies({
      page,
      query: search || "",
    });

    removeTopRatedMovie();

    const movieListTitle = document.querySelector("#movie-list-title");
    if (!movieListTitle) return null;
    movieListTitle.textContent = `"${search}" 검색 결과`;

    if (movies.results.length) {
      renderMovieList(movies);
      updateMoreButton(movies.page, movies.total_pages);
      searchPageState.incrementPage();
    } else {
      renderNoResult();
    }
  } catch (e) {
    showErrorAlert(e);
  }
};

const loadMoreMovies = async () => {
  const isSearchParams = hasSearchParams("search");

  if (isSearchParams) {
    loadSearchMovies();
    return;
  }

  loadPopularMovies();
};

const handleSearch = () => {
  const searchInput = document.querySelector<HTMLInputElement>("#search-input");
  if (!searchInput) return;

  const search = searchInput.value || "";
  if (!search.length) {
    searchInput.focus();
    return;
  }

  searchPageState.resetPage();

  const searchUrl = new URL(baseUrl, window.location.origin);
  searchUrl.searchParams.set("search", search);
  navigate(`${searchUrl.pathname}${searchUrl.search}`);

  removeMovieList();
  loadSearchMovies();
};

addEventListener("load", () => {
  const logo = document.querySelector<HTMLButtonElement>(".logo");
  logo?.addEventListener("click", () => {
    window.location.href = baseUrl;
  });

  const searchButton = document.querySelector("#search-button");
  searchButton?.addEventListener("click", () => {
    handleSearch();
  });

  const searchInput = document.querySelector<HTMLInputElement>("#search-input");
  searchInput?.addEventListener("keyup", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });

  const moreButton = document.querySelector("#more-button");
  moreButton?.addEventListener("click", () => {
    loadMoreMovies();
  });

  if (hasSearchParams("search")) {
    loadSearchMovies();
    return;
  }

  loadTopRatedMovie();
  loadPopularMovies();
});
