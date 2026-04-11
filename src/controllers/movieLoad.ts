import {
  getTopRatedMovies,
  getPopularMovies,
  getSearchMovies,
} from "../services/api";

import {
  renderTopRatedMovie,
  removeTopRatedMovie,
} from "../renders/topRatedMovie";
import {
  removeMovieList,
  renderMovieList,
  renderNoResult,
} from "../renders/movieList";
import { renderSkeleton, removeSkeleton } from "../renders/skeleton";

import PageState from "../states/PageState";
import { getSearchParams, hasSearchParams } from "../utils/router";
import { showError } from "../utils/error";

const popularPageState = new PageState();
const searchPageState = new PageState();

export const loadTopRatedMovie = async () => {
  try {
    const topRatedMovies = await getTopRatedMovies();
    const topRatedMovie = topRatedMovies.results[0];

    if (!topRatedMovie) return;

    renderTopRatedMovie(topRatedMovie);
  } catch (e) {
    showError(e);
  }
};

export const loadPopularMovies = async () => {
  try {
    renderSkeleton();
    const page = popularPageState.getPage() + 1;
    const movies = await getPopularMovies({ page });

    if (movies) {
      renderMovieList(movies);
      popularPageState.incrementPage();
      popularPageState.setTotalPages(movies.total_pages);
    }
  } catch (e) {
    showError(e);
  } finally {
    removeSkeleton();
  }
};

export const loadSearchMovies = async ({
  reset = false,
}: { reset?: boolean } = {}) => {
  if (reset) {
    searchPageState.resetPage();
    removeMovieList();
  }

  try {
    renderSkeleton();
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
      searchPageState.incrementPage();
      searchPageState.setTotalPages(movies.total_pages);
    } else {
      renderNoResult();
    }
  } catch (e) {
    showError(e);
  } finally {
    removeSkeleton();
  }
};

export const loadMovieList = () => {
  const isSearchParams = hasSearchParams("search");

  if (isSearchParams) {
    loadSearchMovies();
    return;
  }

  loadPopularMovies();
};
