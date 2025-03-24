import { movieStore } from "../store/movieStore";
import { getMovieByName, getMovies } from "../apis/MovieApi";
import MovieList from "../components/MovieList";
import MovieListSkeleton from "../components/MovieListSkeleton";
import TopRatedMovie from "../components/TopRatedMovie";
import { DEFAULT_BACK_DROP_URL, MAX_MOVIE_PAGE } from "../constants/movieApi";

const $mainSection = document.querySelector("main section");
const $ul = document.querySelector(".thumbnail-list");
const $error = document.querySelector(".error");
const $h2 = $error?.querySelector("h2");

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

const renderTotalList = async () => {
  const moviesResponse = await getMovies({ page: movieStore.page });
  movieStore.movies = [...movieStore.movies, ...moviesResponse.results];
  movieStore.totalPages = moviesResponse.total_pages;

  renderHeaderBackground();
  changeHeaderBackground();
};

const renderSearchList = async () => {
  changeHeaderBackground();

  const moviesResponse = await getMovieByName({
    name: movieStore.searchKeyword,
    page: movieStore.page,
  });
  movieStore.movies = [...movieStore.movies, ...moviesResponse.results];
  movieStore.totalPages = moviesResponse.total_pages;

  if (movieStore.movies.length === 0) {
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
    if (movieStore.searchKeyword === "") await renderTotalList();
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
  if (movieStore.page !== Math.min(MAX_MOVIE_PAGE, movieStore.totalPages))
    $showMore?.classList.add("open");
  else $showMore?.classList.remove("open");

  if ($ul) $ul.innerHTML = "";
  const $movies = MovieList(movieStore.movies);
  if ($movies) $mainSection?.appendChild($movies);
};
