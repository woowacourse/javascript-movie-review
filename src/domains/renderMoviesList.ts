import { store } from "./../store/index";
import { getMovieByName, getMovies } from "../apis/MovieApi";
import MovieList from "../components/MovieList";
import MovieListSkeleton from "../components/MovieListSkeleton";
import TopRatedMovie from "../components/TopRatedMovie";
import { DEFAULT_BACK_DROP_URL, MAX_MOVIE_PAGE } from "../constants/constants";

const $mainSection = document.querySelector("main section");
const $ul = document.querySelector(".thumbnail-list");
const $error = document.querySelector(".error");
const $h2 = $error?.querySelector("h2");

const renderTotalList = async () => {
  // loading = true
  try {
    const moviesResponse = await getMovies({ page: store.page });
    // loading = false
    store.movies = [...store.movies, ...moviesResponse.results];
    store.totalPages = moviesResponse.total_pages;
  } catch (error: any) {
    $ul?.classList.add("close");
    $error?.classList.remove("close");

    if ($ul) $ul.innerHTML = "";

    if (error.message === "400" && $h2) {
      // page = 501
      $h2.textContent = "검색 가능한 페이지 수를 넘겼습니다.";
    }
    if (error.message === "401" && $h2) {
      console.log(error);

      // 토큰 인증 오류
      $h2.textContent =
        "사용자 인증 정보가 잘못되었습니다. 정보를 다시 확인해주세요.";
    }
    return;
  }

  if (!document.querySelector(".top-rated-movie")) {
    // 인기영화 정보 보여주기
    const $topRatedContainer = document.querySelector(".top-rated-container");
    $topRatedContainer?.append(
      TopRatedMovie({
        title: store.movies[0].title,
        voteAverage: store.movies[0].vote_average,
      })
    );
  }

  /** 헤더 백그라운드 */
  const $backgroundContainer = document.querySelector(".background-container");
  const backgroundImage = store.movies[0].backdrop_path
    ? `${DEFAULT_BACK_DROP_URL}${store.movies[0].backdrop_path}`
    : "./images/default_thumbnail.jpeg";
  ($backgroundContainer as HTMLElement)!.style.backgroundImage = `url(${backgroundImage})`;
};

const renderSearchList = async () => {
  // loading = true
  try {
    const moviesResponse = await getMovieByName({
      name: store.searchKeyword,
      page: store.page,
    });
    // loading = false
    store.movies = [...store.movies, ...moviesResponse.results];
    store.totalPages = moviesResponse.total_pages;
  } catch (error: any) {
    $ul?.classList.add("close");
    $error?.classList.remove("close");

    if ($ul) $ul.innerHTML = "";

    if (error.message === "400" && $h2) {
      // page = 501
      $h2.textContent = "검색 가능한 페이지 수를 넘겼습니다.";
    }
    if (error.message === "401" && $h2) {
      console.log(error);

      // 토큰 인증 오류
      $h2.textContent =
        "사용자 인증 정보가 잘못되었습니다. 정보를 다시 확인해주세요.";
    }
    return;
  }

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

  if (store.searchKeyword === "") {
    await renderTotalList();
  } else {
    await renderSearchList();
  }

  const $showMore = document.querySelector(".show-more");
  if (store.page !== Math.min(MAX_MOVIE_PAGE, store.totalPages)) {
    console.log(1);
    $showMore?.classList.add("open");
  } else {
    $showMore?.classList.remove("open");
  }

  // loading 전달
  if ($ul) $ul.innerHTML = "";
  const $movies = MovieList(store.movies);
  if ($movies) $mainSection?.appendChild($movies);
};
