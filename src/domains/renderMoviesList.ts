import { getMovieByName, getMovies } from "../apis/MovieApi";
import {
  MovieList,
  MovieListSkeleton,
  TopRatedMovie,
} from "../components/index";
import {
  PREFIX_BACKDROP_PATH,
  MAX_MOVIE_PAGE,
  DEFAULT_TOP_RATED_DATA,
} from "../constants/constants";
import { store } from "./../stores";

const $mainSection = document.querySelector("main section");
const $ul = document.querySelector(".thumbnail-list");
const $error = document.querySelector(".error");
const $h2 = $error?.querySelector("h2");

const changeHeaderBackground = () => {
  const $backgroundContainer = document.querySelector(".background-container");

  if (store.searchKeyword === "") {
    const backgroundImage = store.movies[0].backdrop_path
      ? `${PREFIX_BACKDROP_PATH}${store.movies[0].backdrop_path}`
      : DEFAULT_TOP_RATED_DATA.backdropPath;
    ($backgroundContainer as HTMLElement)!.style.backgroundImage = `url(${backgroundImage})`;
  } else {
    ($backgroundContainer as HTMLElement)!.style.backgroundImage = "";
  }
};

const renderHeaderBackground = () => {
  if (!document.querySelector(".top-rated-movie")) {
    const $topRatedContainer = document.querySelector(".top-rated-container");
    $topRatedContainer?.append(
      TopRatedMovie({
        title: store.movies[0].title ?? DEFAULT_TOP_RATED_DATA.title,
        voteAverage:
          store.movies[0].vote_average ?? DEFAULT_TOP_RATED_DATA.voteAverage,
      })
    );
  }
};

const renderTotalList = async () => {
  const moviesResponse = await getMovies({ page: store.page });
  store.movies = [...store.movies, ...moviesResponse.results];
  store.totalPages = moviesResponse.total_pages;

  renderHeaderBackground();
  changeHeaderBackground();
};

const renderSearchList = async () => {
  changeHeaderBackground();

  const moviesResponse = await getMovieByName({
    name: store.searchKeyword,
    page: store.page,
  });
  store.movies = [...store.movies, ...moviesResponse.results];
  store.totalPages = moviesResponse.total_pages;

  if (store.movies.length === 0) {
    $ul?.classList.add("close");
    $error?.classList.remove("close");
    if ($h2) $h2.textContent = "검색 결과가 없습니다.";
  } else {
    $ul?.classList.remove("close");
    $error?.classList.add("close");
  }
};

export const renderMoviesList = async () => {
  const $skeleton = MovieListSkeleton();
  if ($skeleton) $mainSection?.appendChild($skeleton);

  try {
    if (store.searchKeyword === "") await renderTotalList();
    else await renderSearchList();
  } catch (error: any) {
    $ul?.classList.add("close");
    $error?.classList.remove("close");

    if ($ul) $ul.innerHTML = "";
    if (error.message === "400" && $h2)
      $h2.textContent = "검색 가능한 페이지 수를 넘겼습니다.";
    if (error.message === "401" && $h2)
      $h2.textContent = "사용자 인증 정보가 잘못되었습니다.";

    return;
  }

  const $showMore = document.querySelector(".show-more");
  if (store.page !== Math.min(MAX_MOVIE_PAGE, store.totalPages))
    $showMore?.classList.add("open");
  else $showMore?.classList.remove("open");

  if ($ul) $ul.innerHTML = "";
  const $movies = MovieList(store.movies);
  if ($movies) $mainSection?.appendChild($movies);
};
