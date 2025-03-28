import { MovieListSectionProps } from "../../../types/type";
import $MovieList, { addMovieItem } from "./MovieList/MovieList";
import getPopularMovieList from "../../apis/getPopularMovieList";
import getSearchedMovieList from "../../apis/getSearchedMovieList";
import {
  addSkeletonItems,
  removeSkeletonItems,
} from "../Skeleton/MovieList/SkeletonList";
import asyncErrorBoundary from "../ErrorBoundary/Async/asyncErrorBoundary";
import { addErrorBox } from "../ErrorBox/ErrorBox";

type MovieListType = "popular" | "search";
interface MovieState {
  type: MovieListType;
  keyword: string;
  page: number;
  isLoading: boolean;
}

const removeLoadingObserver = () => {
  const $loadingObserver = document.querySelector(".loading-observer");
  $loadingObserver?.remove();
};

interface RenderMoreMovieListParameter {
  currentPage: number;
  fetchFn: (page: number) => Promise<any>;
}

const renderMoreMovieList = async ({
  currentPage,
  fetchFn,
}: RenderMoreMovieListParameter) => {
  addSkeletonItems();
  const { page, total_pages, results } = await fetchFn(currentPage);

  if (page === total_pages) {
    removeLoadingObserver();
  }

  removeSkeletonItems();
  addMovieItem(results);
};

const $MovieListBoxRender = () => {
  const movieState: MovieState = {
    type: "popular",
    keyword: "",
    page: 1,
    isLoading: false,
  };

  let observer: IntersectionObserver | null = null;

  const initCurrentPage = () => {
    movieState.page = 1;
    movieState.isLoading = false;

    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

  const setMovieListType = (type: MovieListType) => {
    movieState.type = type;
  };

  const setKeyword = (keyword: string) => {
    movieState.keyword = keyword;
  };

  const loadMoreMovies = async () => {
    if (movieState.isLoading) return;

    movieState.isLoading = true;
    movieState.page += 1;

    if (movieState.type === "popular") {
      await asyncErrorBoundary({
        asyncFn: () =>
          renderMoreMovieList({
            currentPage: movieState.page,
            fetchFn: getPopularMovieList,
          }),
        fallbackComponent: (errorMessage) => addErrorBox(errorMessage),
      });
    } else {
      await asyncErrorBoundary({
        asyncFn: () =>
          renderMoreMovieList({
            currentPage: movieState.page,
            fetchFn: (page) => getSearchedMovieList(movieState.keyword, page),
          }),
        fallbackComponent: (errorMessage) => addErrorBox(errorMessage),
      });
    }

    movieState.isLoading = false;
  };

  const setupInfiniteScroll = (totalPages: number) => {
    if (movieState.page >= totalPages) return;

    const $loadingObserver =
      document.querySelector(".loading-observer") ||
      createElement("div", {
        className: "loading-observer",
      });

    document.querySelector(".movie-list-box")?.appendChild($loadingObserver);

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !movieState.isLoading) {
          loadMoreMovies();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    observer.observe($loadingObserver);
  };

  const $MovieListBox = ({ title, movieResult }: MovieListSectionProps) => {
    const $fragment = document.createDocumentFragment();
    const $title = createElement("h2", {
      textContent: title,
      className: "thumbnail-list-title",
    });
    const $movieList = $MovieList(movieResult.results);
    $fragment.append($title, $movieList);

    const $movieListBox = createElement("div", {
      className: "movie-list-box",
    });
    $movieListBox.appendChild($fragment);

    setTimeout(() => {
      setupInfiniteScroll(movieResult.total_pages);
    }, 0);

    return $movieListBox;
  };

  return { initCurrentPage, setKeyword, setMovieListType, $MovieListBox };
};

export const { initCurrentPage, setKeyword, setMovieListType, $MovieListBox } =
  $MovieListBoxRender();
