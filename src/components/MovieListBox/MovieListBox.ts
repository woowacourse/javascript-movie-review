import { MovieListSectionProps } from "../../../types/type";
import $MovieList, { addMovieItem } from "./MovieList/MovieList";
import getPopularMovieList from "../../apis/getPopularMovieList";
import getSearchedMovieList from "../../apis/getSearchedMovieList";
import {
  addSkeletonList,
  removeSkeletonList,
} from "../Skeleton/MovieList/SkeletonList";
import asyncErrorBoundary from "../ErrorBoundary/Async/asyncErrorBoundary";
import { addErrorBox } from "../ErrorBox/ErrorBox";

type MovieListType = "popular" | "search";
interface MovieState {
  type: MovieListType;
  keyword: string;
  page: number;
}

const removeObserver = ({ condition }: { condition: boolean }) => {
  if (!condition) {
    return;
  }

  const $observer = document.querySelector(".observer");
  $observer?.remove();
};

interface RenderMoreMovieListParameter {
  currentPage: number;
  fetchFn: (page: number) => Promise<any>;
}

const renderMoreMovieList = async ({
  currentPage,
  fetchFn,
}: RenderMoreMovieListParameter) => {
  addSkeletonList();
  const { page, total_pages, results } = await fetchFn(currentPage);
  removeObserver({ condition: page === total_pages });
  removeSkeletonList();
  addMovieItem(results);
};

const $MovieListBoxRender = () => {
  const movieState: MovieState = {
    type: "popular",
    keyword: "",
    page: 1,
  };

  const setMovieListState = ({ type, keyword, page }: MovieState) => {
    movieState.type = type;
    movieState.keyword = keyword;
    movieState.page = page;
  };

  const loadMoreMovies = async () => {
    movieState.page += 1;

    if (movieState.type === "popular") {
      asyncErrorBoundary({
        asyncFn: () =>
          renderMoreMovieList({
            currentPage: movieState.page,
            fetchFn: getPopularMovieList,
          }),
        fallbackComponent: (errorMessage) => addErrorBox(errorMessage),
      });
      return;
    }

    asyncErrorBoundary({
      asyncFn: () =>
        renderMoreMovieList({
          currentPage: movieState.page,
          fetchFn: (page) => getSearchedMovieList(movieState.keyword, page),
        }),
      fallbackComponent: (errorMessage) => addErrorBox(errorMessage),
    });
  };

  const $MovieListBox = ({ title, movieResult }: MovieListSectionProps) => {
    const $fragment = document.createDocumentFragment();
    const $title = createElement("h2", {
      className: "movie-list-title",
      textContent: title,
    });
    const $movieList = $MovieList(movieResult.results);
    $fragment.append($title, $movieList);

    if (movieResult.page !== movieResult.total_pages) {
      const $observer = createElement("div", {
        className: "observer",
      });

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreMovies();
        }
      });
      observer.observe($observer);

      $fragment.appendChild($observer);
    }

    const $movieListBox = createElement("div", {
      className: "movie-list-box",
    });
    $movieListBox.appendChild($fragment);
    return $movieListBox;
  };

  return { setMovieListState, $MovieListBox };
};

export const { setMovieListState, $MovieListBox } = $MovieListBoxRender();
