import { MovieResponse } from "../../../types/types";
import { fetchMoviesApi } from "../api/fetchMoviesApi";
import { POPULAR_PATH, SEARCH_PATH } from "../../constants/constant";
import {
  handleHeader,
  handleHeaderSearch,
  handleMainTitle,
  handleMoreButton,
  handleMovieList,
  handleSkeleton,
  handleEmptyMovie,
  handleMoreMovie,
} from "./renderHandlers";

export async function controlInitialMovies(
  page: number,
  moreButton: HTMLButtonElement,
): Promise<void> {
  try {
    handleMainTitle("지금 인기 있는 영화");
    handleSkeleton();

    const data: MovieResponse = await fetchMoviesApi(POPULAR_PATH, page);
    handleHeader(data.results[0]);
    handleMovieList(data);
    handleMoreButton(moreButton, data.total_pages, page);
  } catch (error) {
    alert(
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.",
    );
  }
}

export async function controlSearchMovies(
  page: number,
  searchMovie: string,
  moreButton: HTMLButtonElement,
): Promise<void> {
  try {
    handleMainTitle(`"${searchMovie}" 검색 결과`);
    handleSkeleton();

    const data: MovieResponse = await fetchMoviesApi(
      SEARCH_PATH,
      page,
      searchMovie,
    );
    handleHeaderSearch(searchMovie);

    if (data.results.length === 0) {
      handleEmptyMovie();
    } else {
      handleMovieList(data);
    }

    handleMoreButton(moreButton, data.total_pages, page);
  } catch (error) {
    alert(
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.",
    );
  }
}

export async function controlMoreMovies(
  page: number,
  searchMovie: string,
  moreButton: HTMLButtonElement,
): Promise<void> {
  try {
    const data: MovieResponse =
      searchMovie === ""
        ? await fetchMoviesApi(POPULAR_PATH, page)
        : await fetchMoviesApi(SEARCH_PATH, page, searchMovie);
    handleMoreMovie(data);
    handleMoreButton(moreButton, data.total_pages, page);
  } catch (error) {
    alert(
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.",
    );
  }
}
