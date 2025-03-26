import { MoviesResponse } from "../../types/movie";
import { handleApiResponse } from "../api/handlers";
import { getMovies, searchMovies } from "../api/movie";
import { App, Main, TopRatedMovie } from "../components/index";
import {
  DEFAULT_MOVIE_DATA,
  MAX_MOVIE_PAGE,
  PREFIX_POSTER_PATH,
} from "../constants/constants";
import { store } from "./../stores";

const $thumbnailList = document.querySelector(".thumbnail-list");
const $error = document.querySelector(".error");
const $errorMessage = document.querySelector(".error-message");

const showError = (error: string) => {
  $thumbnailList?.classList.add("close");
  $error?.classList.remove("close");
  if ($errorMessage) $errorMessage.textContent = error;
};

const hideError = () => {
  $thumbnailList?.classList.remove("close");
  $error?.classList.add("close");
};

const changeHeaderBackground = () => {
  const $backgroundContainer = document.querySelector(".background-container");

  if (store.searchKeyword === "") {
    const posterImage = store.movies[0].poster_path
      ? `${PREFIX_POSTER_PATH}${store.movies[0].poster_path}`
      : DEFAULT_MOVIE_DATA.posterPath;
    ($backgroundContainer as HTMLElement)!.style.backgroundImage = `url(${posterImage})`;
  } else {
    ($backgroundContainer as HTMLElement)!.style.backgroundImage = "";
  }
};

const renderHeaderBackground = () => {
  if (!document.querySelector(".top-rated-movie")) {
    const $topRatedContainer = document.querySelector(".top-rated-container");
    $topRatedContainer?.append(
      TopRatedMovie({
        title: store.movies[0].title ?? DEFAULT_MOVIE_DATA.title,
        voteAverage:
          store.movies[0].vote_average ?? DEFAULT_MOVIE_DATA.voteAverage,
      })
    );
  }
};

const renderTotalList = async () => {
  const moviesResponse = await getMovies({ page: store.page });

  handleApiResponse<MoviesResponse>(
    moviesResponse,
    (data) => {
      store.movies = [...store.movies, ...data.results];
      store.totalPages = data.total_pages;

      renderHeaderBackground();
      changeHeaderBackground();
    },
    (error) => showError(error)
  );
};

const renderSearchList = async () => {
  changeHeaderBackground();

  const moviesResponse = await searchMovies({
    name: store.searchKeyword,
    page: store.page,
  });

  handleApiResponse<MoviesResponse>(
    moviesResponse,
    (data) => {
      store.movies = [...store.movies, ...data.results];
      store.totalPages = data.total_pages;

      store.movies.length === 0
        ? showError("검색 결과가 없습니다.")
        : hideError();
    },
    (error) => showError(error)
  );
};

export const updateMoviesList = async () => {
  if (store.searchKeyword === "") await renderTotalList();
  else await renderSearchList();

  Main.getInstance().render({
    movies: store.movies,
    isLoading: false,
  });

  // TODO: 더보기 버튼 로직 분리
  const $showMore = document.querySelector(".show-more");
  if (store.page !== Math.min(MAX_MOVIE_PAGE, store.totalPages))
    $showMore?.classList.add("open");
  else $showMore?.classList.remove("open");
};

export const initializeLayout = () => {
  const $app = document.querySelector("#app");
  $app?.append(App());
};
