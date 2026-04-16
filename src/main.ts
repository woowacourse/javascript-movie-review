import type { AppElements } from "../types/dom";
import type { MovieUserRating } from "../types/movieRating";
import type { State } from "../types/state";
import { fetchMovieDetail, fetchMoviePageData } from "./API/api";
import { getAppElements } from "./services/AppElementService";
import { createMovieDetailController } from "./services/MovieDetailController";
import { initializeMovieDetailModal, syncMovieDetailModalClosedState } from "./services/MovieDetailModalService";
import { applyMovieUserRatings, isMovieUserRating } from "./services/MovieRatingService";
import {
  applyMovieUserRatingToMovieList,
  createInitialMoviePageState,
  createNextMoviePageState,
  syncMoviePage,
  syncMovieSectionTitle,
} from "./services/MoviePageStateService";
import { notifyEmptyQuery, notifyError } from "./services/NotifyService";
import { makeSkeleton, renderMovies } from "./services/RenderService";
import { createMovieRatingRepository } from "./repositories/MovieRatingRepository";

const state: State = createInitialMoviePageState();
const movieRatingRepository = createMovieRatingRepository();

let isLoading = false;
let failedPage: number | null = null;

const clearSkeleton = (elements: AppElements) => {
  elements.skeletonCard.replaceChildren();
};

const handleAsyncError = (elements: AppElements, error: unknown) => {
  syncMoviePage(elements, state);
  notifyError(error);
};

const executeWithErrorHandling = async (elements: AppElements, action: () => Promise<void>) => {
  try {
    await action();
  } catch (error) {
    handleAsyncError(elements, error);
  }
};

const getMovieIdFromTarget = (target: EventTarget | null) => {
  if (!(target instanceof Element)) {
    return null;
  }

  const movieItem = target.closest<HTMLElement>(".item[data-movie-id]");
  const movieId = movieItem?.dataset.movieId;

  if (!movieId) {
    return null;
  }

  const parsedMovieId = Number(movieId);

  return Number.isNaN(parsedMovieId) ? null : parsedMovieId;
};

const blurActiveElement = () => {
  if (!(document.activeElement instanceof HTMLElement)) {
    return;
  }

  document.activeElement.blur();
};

const clearMovieDetailTriggerFocus = () => {
  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(() => {
      blurActiveElement();
    });

    return;
  }

  blurActiveElement();
};

const hydrateMoviesWithUserRatings = async (movieList: State["movieList"]) => {
  const movieRatings = await movieRatingRepository.getMany(movieList.map(({ id }) => id));

  return applyMovieUserRatings(movieList, movieRatings);
};

const loadMovies = async (elements: AppElements, query: string = state.query, shouldReset = false) => {
  if (isLoading) return;
  isLoading = true;

  if (shouldReset) {
    failedPage = null;
  }

  const nextPage = shouldReset ? 1 : state.currentPage + 1;

  makeSkeleton(elements.skeletonCard);

  try {
    const response = await fetchMoviePageData(nextPage, query);
    const hydratedMovieList = await hydrateMoviesWithUserRatings(response.results);
    const nextState = createNextMoviePageState(state, response, hydratedMovieList, query, shouldReset);

    Object.assign(state, nextState);
    syncMovieSectionTitle(elements, state);
    renderMovies(state.movieList, elements.movieList);
    syncMoviePage(elements, state);
    failedPage = null;
  } catch (error) {
    failedPage = nextPage;
    throw error;
  } finally {
    clearSkeleton(elements);
    isLoading = false;
  }
};

const bindEvents = (elements: AppElements, detailController: ReturnType<typeof createMovieDetailController>) => {
  const observer = new IntersectionObserver(async (entries) => {
    const entry = entries[0];
    if (!entry.isIntersecting) {
      failedPage = null; // 화면 밖으로 벗어나면 실패 상태 초기화하여 다시 접근 시 재시도 허용
      return;
    }

    const hasMorePages = state.currentPage < state.totalPage;
    const isFailedCurrentNextPage = failedPage === state.currentPage + 1;

    if (!isLoading && hasMorePages && !isFailedCurrentNextPage) {
      await executeWithErrorHandling(elements, () => loadMovies(elements));
    }
  });

  observer.observe(elements.infiniteScrollSentinel);

  elements.movieList.addEventListener("click", async (event) => {
    const movieId = getMovieIdFromTarget(event.target);

    if (!movieId) {
      return;
    }

    await detailController.openById(movieId);
  });

  elements.movieList.addEventListener("keydown", async (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    const movieId = getMovieIdFromTarget(event.target);

    if (!movieId) {
      return;
    }

    event.preventDefault();
    await detailController.openById(movieId);
  });

  elements.searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = elements.searchInput.value.trim();

    if (!query) {
      notifyEmptyQuery();
      elements.searchInput.focus();
      return;
    }

    await executeWithErrorHandling(elements, () => loadMovies(elements, query, true));
  });

  elements.heroDetailButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const heroMovie = state.movieList[0];

    if (!heroMovie) {
      return;
    }

    await detailController.openById(heroMovie.id);
  });

  elements.closeModal.addEventListener("click", () => {
    detailController.close();
  });

  elements.modalBackground.addEventListener("click", (event) => {
    if (event.target !== elements.modalBackground) {
      return;
    }

    detailController.close();
  });

  elements.modalBackground.addEventListener("close", () => {
    if (elements.modalBackground.classList.contains("active")) {
      syncMovieDetailModalClosedState(elements);

      detailController.syncClosedState();
    }

    clearMovieDetailTriggerFocus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !elements.modalBackground.open) {
      return;
    }

    detailController.close();
  });

  elements.myRatingButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const ratingValue = Number(button.dataset.userRating);

      if (!isMovieUserRating(ratingValue)) {
        return;
      }

      try {
        await detailController.updateUserRating(ratingValue);
      } catch (error) {
        notifyError(error);
      }
    });
  });
};

const main = async () => {
  const elements = getAppElements();
  const detailController = createMovieDetailController({
    elements,
    loadMovieDetail: fetchMovieDetail,
    movieRatingRepository,
    onError: notifyError,
    onMovieRated: (movieId, userRating) => {
      state.movieList = applyMovieUserRatingToMovieList(state.movieList, movieId, userRating);
    },
  });

  initializeMovieDetailModal(elements);
  bindEvents(elements, detailController);

  await executeWithErrorHandling(elements, () => loadMovies(elements));
};

window.addEventListener("load", () => {
  void main();
});
