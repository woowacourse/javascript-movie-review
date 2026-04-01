import { navigate, getSearchParams, hasSearchParams } from "./router";

import {
  getMoviePopular,
  getTopRatedMovie,
  getSearchMovie,
} from "./service/api";

import {
  renderTopRatedMovie,
  renderMovieList,
  renderNoResult,
  renderSkeleton,
  removeTopRatedMovie,
  removeMovieList,
  removeSkeleton,
} from "./render";

const condition = {
  page: 1,
};

const runSearch = () => {
  const search = getSearchParams("search") as string;

  (async () => {
    const movies = await getSearchMovie({
      page: condition.page,
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
  condition.page = 1;
  navigate(`/?search=${search}`);

  removeMovieList();
  runSearch();
};

addEventListener("load", async () => {
  (async () => {
    const topRatedMovies = await getTopRatedMovie();
    renderTopRatedMovie(topRatedMovies);
  })();

  (async () => {
    renderSkeleton();

    const movies = await getMoviePopular({ page: condition.page });
    renderMovieList(movies);
    removeSkeleton();
  })();

  const moreButton = document.querySelector("#more-button");
  moreButton?.addEventListener("click", () => {
    condition.page += 1;
    const isSearchParams = hasSearchParams("search");

    if (isSearchParams) {
      runSearch();
      return;
    }
    (async () => {
      const movies = await getMoviePopular({ page: condition.page });
      renderMovieList(movies);
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
