import { navigate, getSearchParams, hasSearchParams } from "./utils/router";

import {
  ApiError,
  getMoviePopular,
  getTopRatedMovie,
  getSearchMovie,
  getMovieMovieId,
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

import { renderDetailModal } from "./renders/detailModal";

import PageState from "./states/PageState";

const pageState = new PageState();

const loadInit = () => {
  const search = getSearchParams("search") as string;

  if(search === null){
    (async () => {
      const topRatedMovies = await errorTryCatch(
        async () => await getTopRatedMovie(),
        (e: ApiError) => {
          if (e.status_code == 22) {
            alert("잘못된 요청입니다.");
            return;
          }
          alert("영화 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
        }
      );

      const topRatedMovie = topRatedMovies.results[0];

      renderTopRatedMovie(topRatedMovie);
    })();

    (async () => {
      renderSkeleton();
      const page = pageState.getPage();
      const movies = await errorTryCatch(
        async () => await getMoviePopular({ page }),
        async (e: ApiError) => {
          if (e.status_code == 22) {
            alert("잘못된 페이지 요청입니다.");
            return;
          }
          alert("영화 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
        },
      );

      if (movies) renderMovieList(movies);
      removeSkeleton(Date.now());
    })();
  } else {
    runSearch();
  }
}

const runSearch = () => {
  const search = getSearchParams("search") as string;

  (async () => {
    const page = pageState.getPage();
    const movies = await errorTryCatch(
      async () => await getSearchMovie({
        page,
        query: search || "",
      }), (e: ApiError) => {
        if(e.status_code === 22){
          alert("잘못된 검색 요청입니다.");
            return;
        }
        alert("영화 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
      }
    );

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

export const handleDetail = (id: number) => {
  (async () => {
    const movieInfo = await getMovieMovieId({id});
    renderDetailModal(movieInfo);
  })();
}

const errorTryCatch = async (api: Function, errorCallback: Function) => {
  try {
    return await api();
  } catch (e) {
    errorCallback(e);
  }
};

addEventListener("load", async () => {

  loadInit();

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
            alert("잘못된 페이지 요청입니다.");
            return;
          }
          alert("영화 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
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
