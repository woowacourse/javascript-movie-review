/// <reference types="vite/client" />

import type { InfiniteScrollInstance } from "./service/scrollService.ts";
import {
  URLS,
  defaultOptions,
  defaultQueryObject,
} from "./setting/settings.ts";
import { setLoadMovies, setShowingItem } from "./state/movieState.ts";
import {
  renderHeaderAndHero,
  renderMovieItems,
  updateDetails,
  updateHero,
} from "./view/MovieView.ts";
import type { BasicMovieDetails } from "./view/MovieView.ts";
import Toast from "./components/Toast/Toast";
import createMovieLoader from "./service/loaderService.ts";
import fetchAndSetLoadingEvent from "./service/fetchService.ts";
import { setupInfiniteScroll } from "./service/scrollService.ts";
import {
  handleConnectionError,
  checkApiAvailability,
} from "./service/errorService.ts";
import {
  bindLoadingEvents,
  bindModalEvents,
  bindStarRatingEvents,
  bindThumbnailClickEvent,
  bindHeaderScrollEvent,
} from "./binders/event-binders";

let infiniteScrollInstance: InfiniteScrollInstance = null;

interface MovieListResponse {
  results: Result[];
  isLastPage: boolean;
}

const initMovies = () => {
  return createMovieLoader(
    URLS.popularMovieUrl,
    defaultQueryObject,
    defaultOptions,
    handleError
  );
};
const handleError = (error: Error) => {
  Toast.showToast(error.message, "error", 5000);
  checkApiAvailability(infiniteScrollInstance);
};
// 셋업 무비 데이타와 render를 분리.
const setupMovieData = (data: MovieListResponse | null) => {
  if (!data) {
    throw new Error("데이터가 없습니다. 잠시후 다시 사용해주세요.");
  }
  const firstMovie = data.results[0];
  setShowingItem(String(firstMovie.id));
  return {
    firstMovie,
    movieList: data.results,
  };
};

const createBasicMovieDetails = (movie: Result): BasicMovieDetails => ({
  poster_path: movie.poster_path || "",
  release_date: movie.release_date,
  overview: movie.overview,
  title: movie.title,
  vote_average: movie.vote_average,
  genres: [],
  id: movie.id,
});

const renderHeroSection = (firstMovie: Result) => {
  renderHeaderAndHero();
  updateHero(firstMovie);
  updateDetails(createBasicMovieDetails(firstMovie));
};

const renderMovieList = (movies: Result[]) => {
  renderMovieItems(movies, false);
};

const renderApp = (data: MovieListResponse | null) => {
  const { firstMovie, movieList } = setupMovieData(data);
  renderHeroSection(firstMovie);
  renderMovieList(movieList);
};

const bindEventListeners = () => {
  bindLoadingEvents();
  bindThumbnailClickEvent();

  bindModalEvents();
  bindStarRatingEvents();
  bindHeaderScrollEvent();
};

const main = async () => {
  try {
    const loadMovies = initMovies();
    setLoadMovies(loadMovies);
    const data = await fetchAndSetLoadingEvent();
    infiniteScrollInstance = setupInfiniteScroll();
    renderApp(data);
    bindEventListeners();
  } catch (error) {
    handleConnectionError();
  }
};
main();

export { infiniteScrollInstance };
