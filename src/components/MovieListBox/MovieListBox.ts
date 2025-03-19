import { MovieListSectionProps } from "../../../types/type";
import $MovieList, { addMovieItem } from "../MovieList/MovieList";
import getPopularMovieList from "../../apis/getPopularMovieList";
import getSearchedMovieList from "../../apis/getSearchedMovieList";
import {
  addSkeletonList,
  removeSkeletonList,
} from "../Skeleton/List/SkeletonList";

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

const $MovieListBoxRender = () => {
  const movieState: MovieState = {
    type: "popular",
    keyword: "",
    page: 1,
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
      addSkeletonList();
      const { page, total_pages, results } = await getPopularMovieList(
        movieState.page
      );

      removeMoreButton({ condition: page === total_pages });
      removeSkeletonList();
      addMovieItem(results);
      return;
    }

    addSkeletonList();
    const { page, total_pages, results } = await getSearchedMovieList(
      movieState.keyword,
      movieState.page
    );
    removeMoreButton({ condition: page === total_pages });
    removeSkeletonList();
    addMovieItem(results);
  };

  const $MovieListBox = ({ title, movieResult }: MovieListSectionProps) => {
    const $fragment = document.createDocumentFragment();
    const $title = createElement("h2", {
      textContent: title,
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

  return { setKeyword, setMovieListType, $MovieListBox };
};

export const { setKeyword, setMovieListType, $MovieListBox } =
  $MovieListBoxRender();
