import {
  getMovieDetails,
  getPopularMovies,
  getSearchMovies,
} from "./apis/api.ts";
import MovieState from "./state/business/movieState.ts";
import { getMyRating, setMyRating } from "./storage/domain/myRating.ts";
import {
  setupModalCloseInteraction,
  setupMovieInteraction,
  setupMyRatingInteraction,
  setupSearchInteraction,
} from "./ui/business/interactor.ts";
import {
  paintClearBanner,
  paintEmptyResult,
  paintError,
  paintHomeSectionHeading,
  paintInitialLoading,
  paintInView,
  paintMovieBanner,
  paintMovieList,
  paintMovieModal,
  paintMovieModalError,
  paintMovieModalSkeleton,
  paintPrepareSearch,
  paintRemoveModal,
  paintRemoveModalSkeleton,
  paintResetList,
} from "./ui/business/painter.ts";
import {
  replaceLoadMoreScrollObserver,
  setupHeaderScrollObserver,
} from "./ui/business/scrollObserver.ts";

const ONCE_MOVIE_LIMIT = 20;
const INITIAL_PAGE_NUM = 1;

export async function loadInitialMovie() {
  const { movies, page } = await getPopularMovies({
    pageNum: INITIAL_PAGE_NUM,
    onLoading: () => paintInitialLoading(ONCE_MOVIE_LIMIT),
    onError: () => {
      paintError();
      paintClearBanner();
    },
  });

  MovieState.setNextPageNum(page + 1);
  MovieState.setRequestMovieCount(movies.length);

  paintHomeSectionHeading();
  if (movies.length > 0) {
    paintMovieBanner(movies[0]);
    setupHeaderScrollObserver();
    paintMovieList(movies);
    paintInView();
  }

  setupInteractions();
}

function setupInteractions() {
  replaceLoadMoreScrollObserver(loadMoreMovies);
  setupSearchInteraction(loadSearchMovies);
  setupMovieInteraction(loadMovieDetails);
  setupModalCloseInteraction(paintRemoveModal);
}

export async function loadMovieDetails(movieId: string) {
  const savedMyRate = getMyRating(movieId); //TODO: 계층이 일정하지 않음

  await getMovieDetails({
    movieId,
    onSuccess: (movie) => {
      const renderModalWithRating = (rating: number) => {
        setMyRating(movieId, rating); //TODO: 계층이 일정하지 않음
        paintRemoveModal();
        paintMovieModal(movie, rating);
        setupMyRatingInteraction(renderModalWithRating);
      };

      paintRemoveModalSkeleton();
      paintMovieModal(movie, savedMyRate);
      setupMyRatingInteraction(renderModalWithRating);
    },
    onError: () => {
      paintRemoveModalSkeleton();
      paintMovieModalError();
    },
    onLoading: () => paintMovieModalSkeleton(),
  });
}

export async function loadMoreMovies() {
  const { page, movies } = await getPopularMovies({
    pageNum: MovieState.getNextPageNum(),
    onError: () => {
      paintError();
      paintClearBanner();
    },
    onLoading: () => paintInitialLoading(MovieState.getRequestMovieCount()),
  });

  MovieState.setNextPageNum(page + 1);
  paintMovieList(movies);
}

export async function loadSearchMovies(query: string) {
  replaceLoadMoreScrollObserver(() => loadMoreSearchMovies(query));

  const { page, movies } = await getSearchMovies({
    query,
    pageNum: INITIAL_PAGE_NUM,
    onError: () => paintError(),
    onLoading: () =>
      paintPrepareSearch(query, MovieState.getRequestMovieCount()),
  });

  MovieState.setNextSearchPageNum(page + 1);
  paintResetList();

  if (movies.length === 0) paintEmptyResult();
  else paintMovieList(movies);
}

export async function loadMoreSearchMovies(query: string) {
  const { page, movies } = await getSearchMovies({
    query,
    pageNum: MovieState.getNextSearchPageNum(),
    onError: () => paintError(),
    onLoading: () => paintInitialLoading(MovieState.getRequestMovieCount()),
  });

  MovieState.setNextSearchPageNum(page + 1);
  paintMovieList(movies);
}
