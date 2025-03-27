import MovieList from "../../components/MovieList";
import MovieListSkeleton from "../../components/MovieListSkeleton";
import TopRatedMovie from "../../components/TopRatedMovie";
import { errorMessages } from "../../constants/message";
import { DEFAULT_BACK_DROP_URL } from "../../constants/movieApi";
import { movieStore } from "../../store/movieStore";
import { fetchSearchList, fetchTotalList } from "./movieListService";

const $mainSection = document.querySelector("main section");
const $ul = document.querySelector(".thumbnail-list");
const $error = document.querySelector(".error");
const $h2 = $error?.querySelector("h2");
const MAX_MOVIE_PAGE = 500;

const changeHeaderBackground = () => {
  const $backgroundContainer = document.querySelector(".background-container");

  if (movieStore.searchKeyword === "") {
    const backgroundImage = movieStore.movies[0].backdrop_path
      ? `${DEFAULT_BACK_DROP_URL}${movieStore.movies[0].backdrop_path}`
      : "./images/default_thumbnail.jpeg";
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
        title: movieStore.movies[0].title,
        voteAverage: movieStore.movies[0].vote_average,
      })
    );
  }
};

const renderSkeleton = () => {
  const $skeleton = MovieListSkeleton();
  $skeleton && $mainSection?.appendChild($skeleton);
};

const renderErrorPage = (error: any) => {
  $ul?.classList.add("close");
  $error?.classList.remove("close");
  $ul && ($ul.innerHTML = "");
  if (!$h2 || !error.message) {
    return;
  }
  $h2.textContent = errorMessages(error.message);
};

const toggleEmptySearchError = () => {
  if (movieStore.movies.length === 0) {
    $ul?.classList.add("close");
    $error?.classList.remove("close");
    if ($h2) $h2.textContent = "검색 결과가 없습니다.";
  } else {
    $ul?.classList.remove("close");
    $error?.classList.add("close");
  }
};

const toggleShowMoreButton = () => {
  const $showMore = document.querySelector(".show-more");
  if (movieStore.page !== Math.min(MAX_MOVIE_PAGE, movieStore.totalPages))
    $showMore?.classList.add("open");
  else $showMore?.classList.remove("open");
};

export const renderMoviesList = async () => {
  renderSkeleton();

  try {
    if (movieStore.searchKeyword === "") {
      await fetchTotalList();
      renderHeaderBackground();
    } else {
      await fetchSearchList();
      toggleEmptySearchError();
    }
    changeHeaderBackground();
  } catch (error) {
    if (error instanceof Error) {
      console.log("error :", error);
      renderErrorPage(error);
    }
  }

  toggleShowMoreButton();

  if ($ul) $ul.innerHTML = "";
  const $movies = MovieList(movieStore.movies);
  if ($movies) $mainSection?.appendChild($movies);
};
