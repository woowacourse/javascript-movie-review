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

const removeMoreButton = ({ condition }: { condition: boolean }) => {
  if (!condition) {
    return;
  }

  const $moreButton = document.querySelector(".more-button");
  $moreButton?.remove();
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
  removeMoreButton({ condition: page === total_pages });
  removeSkeletonList();
  addMovieItem(results);
};

const $MovieListBoxRender = () => {
  const movieState: MovieState = {
    type: "popular",
    keyword: "",
    page: 1,
  };

  const initCurrentPage = () => {
    movieState.page = 1;
  };

  const setMovieListType = (type: MovieListType) => {
    movieState.type = type;
  };

  const setKeyword = (keyword: string) => {
    movieState.keyword = keyword;
  };

  const handleMoreButtonClick = async () => {
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
      textContent: title,
      className: "thumbnail-list-title",
    });
    const $movieList = $MovieList(movieResult.results);
    $fragment.append($title, $movieList);

    if (movieResult.page !== movieResult.total_pages) {
      const $moreButton = createElement("button", {
        type: "button",
        className: "more-button",
        textContent: "더 보기",
      });
      $moreButton.addEventListener("click", handleMoreButtonClick);
      $fragment.appendChild($moreButton);
    }

    const $movieListBox = createElement("div", {
      className: "movie-list-box",
    });
    $movieListBox.appendChild($fragment);
    return $movieListBox;
  };

  return { initCurrentPage, setKeyword, setMovieListType, $MovieListBox };
};

export const { initCurrentPage, setKeyword, setMovieListType, $MovieListBox } =
  $MovieListBoxRender();
