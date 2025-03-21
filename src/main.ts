import { MovieListSectionProps } from "../types/type";
import getPopularMovieList from "./apis/getPopularMovieList";
import $Banner from "./components/Banner/Banner";
import asyncErrorBoundary from "./components/ErrorBoundary/Async/asyncErrorBoundary";
import { addErrorBox } from "./components/ErrorBox/ErrorBox";
import $HeaderBox from "./components/HeaderBox/HeaderBox";
import {
  $MovieListBox,
  initCurrentPage,
} from "./components/MovieListBox/MovieListBox";
import { replaceSkeletonList } from "./components/Skeleton/MovieList/SkeletonList";

export const replaceMovieListBox = ({
  title,
  movieResult,
}: MovieListSectionProps) => {
  initCurrentPage();
  const $movieListSection = document.querySelector(
    ".movie-list-section"
  ) as HTMLElement;

  $movieListSection.replaceChildren(
    $MovieListBox({
      title,
      movieResult,
    })
  );
};

const initPopularMovieListRender = async () => {
  replaceSkeletonList();

  const popularMovieListResult = await getPopularMovieList(1);

  replaceMovieListBox({
    title: "인기있는 영화",
    movieResult: popularMovieListResult,
  });
};

const $header = document.querySelector("header");
$header?.append($Banner(), $HeaderBox());

asyncErrorBoundary({
  asyncFn: () => initPopularMovieListRender(),
  fallbackComponent: (errorMessage) => addErrorBox(errorMessage),
});
