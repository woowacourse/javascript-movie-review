import {
  getTopRatedMovies,
  getPopularMovies,
  getSearchMovies,
  getMovieDetail,
} from "./services/api";

import { renderTopRatedMovie, removeTopRatedMovie } from "./view/topRatedMovie";
import {
  removeMovieList,
  renderMovieList,
  renderNoResult,
  renderSearchTitle,
} from "./view/movieList";
import {
  renderMovieListSkeleton,
  removeMovieListSkeleton,
  removeMovieDetailSkeleton,
} from "./view/skeleton";

import PageState from "./states/PageState";
import { getSearchParams, hasSearchParams } from "./utils/router";
import { showError } from "./utils/error";
import { renderMovieDetail } from "./view/movieDetail";

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

export const loadPopularMovies = async (): Promise<boolean> => {
  if (popularPageState.isLastPage()) return true;

  try {
    renderMovieListSkeleton();
    const page = popularPageState.getPage() + 1;
    const movies = await getPopularMovies({ page });

    if (movies) {
      renderMovieList(movies);
      popularPageState.incrementPage();
      popularPageState.setTotalPages(movies.total_pages);
    }
    return popularPageState.isLastPage();
  } catch (e) {
    showError(e);
    return true;
  } finally {
    removeMovieListSkeleton();
  }
};

export const loadSearchMovies = async ({
  reset = false,
}: { reset?: boolean } = {}): Promise<boolean> => {
  if (reset) {
    searchPageState.resetPage();
    removeMovieList();
  }

  if (!reset && searchPageState.isLastPage()) return true;

  try {
    renderMovieListSkeleton();
    const search = getSearchParams("search") as string;

    const page = searchPageState.getPage() + 1;
    const movies = await getSearchMovies({
      page,
      query: search || "",
    });

    removeTopRatedMovie();
    renderSearchTitle(search);

    if (movies.results.length) {
      renderMovieList(movies);
      searchPageState.incrementPage();
      searchPageState.setTotalPages(movies.total_pages);
    } else {
      renderNoResult();
    }

    return searchPageState.isLastPage();
  } catch (e) {
    showError(e);
    return true;
  } finally {
    removeMovieListSkeleton();
  }
};

export const loadMovieList = async (): Promise<boolean> => {
  const isSearchParams = hasSearchParams("search");

  if (isSearchParams) return await loadSearchMovies();

  return await loadPopularMovies();
};

export const loadMovieDetail = async (movieId: string) => {
  try {
    const movieDetail = await getMovieDetail(movieId);
    renderMovieDetail(movieDetail);
  } catch (e) {
    showError(e);
  } finally {
    removeMovieDetailSkeleton();
  }
};
