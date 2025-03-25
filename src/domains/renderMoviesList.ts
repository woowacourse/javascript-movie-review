import { MoviesResponse } from "../../types/movie";
import { handleApiResponse } from "../api/handlers";
import { getMovieByName, getMovies } from "../api/movie";
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

  handleApiResponse<MoviesResponse>(
    moviesResponse,
    (data) => {
      store.movies = [...store.movies, ...data.results];
      store.totalPages = data.total_pages;

      renderHeaderBackground();
      changeHeaderBackground();
    },
    (error) => {
      $ul?.classList.add("close");
      $error?.classList.remove("close");
      if ($h2) $h2.textContent = error;
    }
  );
};

const renderSearchList = async () => {
  changeHeaderBackground();

  const moviesResponse = await getMovieByName({
    name: store.searchKeyword,
    page: store.page,
  });

  handleApiResponse<MoviesResponse>(
    moviesResponse,
    (data) => {
      store.movies = [...store.movies, ...data.results];
      store.totalPages = data.total_pages;

      if (store.movies.length === 0) {
        $ul?.classList.add("close");
        $error?.classList.remove("close");
        if ($h2) $h2.textContent = "검색 결과가 없습니다.";
      } else {
        $ul?.classList.remove("close");
        $error?.classList.add("close");
      }
    },
    (error) => {
      $ul?.classList.add("close");
      $error?.classList.remove("close");
      if ($h2) $h2.textContent = error;
    }
  );
};

export const renderMoviesList = async () => {
  const $skeleton = MovieListSkeleton();
  if ($skeleton) $mainSection?.appendChild($skeleton);

  if (store.searchKeyword === "") await renderTotalList();
  else await renderSearchList();

  const $showMore = document.querySelector(".show-more");
  if (store.page !== Math.min(MAX_MOVIE_PAGE, store.totalPages))
    $showMore?.classList.add("open");
  else $showMore?.classList.remove("open");

  if ($ul) $ul.innerHTML = "";
  const $movies = MovieList(store.movies);
  if ($movies) $mainSection?.appendChild($movies);
};
