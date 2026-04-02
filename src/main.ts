import { navigate, getSearchParams, hasSearchParams } from "./utils/router";

import {
  ApiError,
  getMoviePopular,
  getTopRatedMovie,
  getSearchMovie,
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

const runSearch = () => {
  const search = getSearchParams("search") as string;

  (async () => {
    const page = pageState.getPage();
    const movies = await getSearchMovie({
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
  })();
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
  runSearch();
};

const errorTryCatch = async (api: Function, errorCallback: Function) => {
  try {
    return await api();
  } catch (e) {
    errorCallback(e);
  }
};

addEventListener("load", async () => {
  (async () => {
    const topRatedMovies = await getTopRatedMovie();

    renderTopRatedMovie(topRatedMovies);
  })();

  (async () => {
    renderSkeleton();
    const page = pageState.getPage();
    const movies = await errorTryCatch(
      async () => await getMoviePopular({ page }),
      async (e: ApiError) => {
        if (e.status_code == 22) {
          alert("페이지 제대로 넣어라");
          return;
        }
        alert("범용 에러 메시지");
      },
    );

    if (movies) renderMovieList(movies);
    removeSkeleton();
  })();

  const moreButton = document.querySelector("#more-button");
  moreButton?.addEventListener("click", () => {
    pageState.increamentPage();
    const isSearchParams = hasSearchParams("search");

    if (isSearchParams) {
      runSearch();
      return;
    }
    (async () => {
      const page = pageState.getPage();

      const movies = await errorTryCatch(
        async () => await getMoviePopular({ page }),
        async (e: ApiError) => {
          if (e.status_code == 22) {
            alert("페이지 제대로 넣어라");
            return;
          }
          alert("범용 에러 메시지");
        },
      );

      if (movies) renderMovieList(movies);
    })();
  });

  const searchButton = document.querySelector("#search-button");
  searchButton?.addEventListener("click", () => {
    handleSearch();
  });

  const searchInput = document.querySelector<HTMLInputElement>("#search-input");
  if (!searchInput) return;
  searchInput?.addEventListener("keyup", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
});
