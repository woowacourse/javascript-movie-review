import { store } from "./../store/index";
import { getMovieByName, getMovies } from "../apis/MovieApi";
import MovieList from "../components/ThumbnailList";
import MovieListSkeleton from "../components/MovieListSkeleton";
import TopRatedMovie from "../components/TopRatedMovie";
import { DEFAULT_BACK_DROP_URL, MAX_MOVIE_PAGE } from "../constants";

const $mainSection = document.querySelector("main section") as HTMLElement;
const $ul = document.querySelector(".thumbnail-list") as HTMLElement;
const $error = document.querySelector(".error") as HTMLElement;
const $h2 = $error.querySelector("h2") as HTMLElement;

const changeHeaderBackground = () => {
  const $backgroundContainer = document.querySelector(
    ".background-container"
  ) as HTMLElement;

  if (store.searchKeyword === "") {
    const backgroundImage = store.movies[0].backdrop_path
      ? `${DEFAULT_BACK_DROP_URL}${store.movies[0].backdrop_path}`
      : "./images/default_thumbnail.jpeg";
    $backgroundContainer.style.backgroundImage = `url(${backgroundImage})`;
  } else {
    $backgroundContainer.style.backgroundImage = "";
  }
};

const renderHeaderBackground = () => {
  if (!document.querySelector(".top-rated-movie")) {
    const $topRatedContainer = document.querySelector(".top-rated-container");
    $topRatedContainer?.append(
      TopRatedMovie({
        title: store.movies[0].title,
        voteAverage: store.movies[0].vote_average,
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
    $ul.classList.add("close");
    $error.classList.remove("close");
    if ($h2) $h2.textContent = "검색 결과가 없습니다.";
  } else {
    $ul.classList.remove("close");
    $error.classList.add("close");
  }
};

export const renderMoviesList = async () => {
  const $skeleton = MovieListSkeleton();
  if ($skeleton) $mainSection.appendChild($skeleton);

  try {
    if (store.searchKeyword === "") await renderTotalList();
    else await renderSearchList();
  } catch (error: any) {
    $ul.classList.add("close");
    $error.classList.remove("close");

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
  if ($movies) $mainSection.appendChild($movies);
};
