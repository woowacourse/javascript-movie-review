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

const pageState = new PageState();

const loadTopRatedMovie = async () => {
  const topRatedMovies = await getTopRatedMovies();

  renderTopRatedMovie(topRatedMovies);
};

const loadPopularMovies = async () => {
  renderSkeleton();
  const page = pageState.getPage();
  const movies = await errorTryCatch(
    async () => await getPopularMovies({ page }),
    async (e: ApiError) => {
      if (e.status_code == 22) {
        alert("잘못된 페이지 요청입니다.");
        return;
      }
      alert("영화 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
    },
  );

  if (movies) renderMovieList(movies);
  removeSkeleton();
};

const loadSearchMovies = async () => {
  const search = getSearchParams("search") as string;

  const page = pageState.getPage();
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
  } else {
    renderNoResult();
  }
};

const loadMoreMovies = async () => {
  pageState.incrementPage();
  const isSearchParams = hasSearchParams("search");

  if (isSearchParams) {
    loadSearchMovies();
    return;
  }

  const page = pageState.getPage();

  const movies = await errorTryCatch(
    async () => await getPopularMovies({ page }),
    async (e: ApiError) => {
      if (e.status_code == 22) {
        alert("잘못된 페이지 요청입니다.");
        return;
      }
      alert("영화 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
    },
  );

  if (movies) renderMovieList(movies);
};

const handleSearch = () => {
  const searchInput = document.querySelector<HTMLInputElement>("#search-input");
  if (!searchInput) return;

  const search = searchInput.value || "";
  if (!search.length) {
    searchInput.focus();
    return;
  }

  pageState.resetPage();
  navigate(`/?search=${search}`);

  removeMovieList();
  loadSearchMovies();
};

const errorTryCatch = async (api: Function, errorCallback: Function) => {
  try {
    return await api();
  } catch (e) {
    errorCallback(e);
  }
};

addEventListener("load", () => {
  const moreButton = document.querySelector("#more-button");
  moreButton?.addEventListener("click", () => {
    loadMoreMovies();
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

  loadTopRatedMovie();
  loadPopularMovies();
});
