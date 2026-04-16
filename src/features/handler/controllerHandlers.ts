import { fetchMoviesApi } from "../api/fetchMoviesApi";
import { fetchMovieDetailApi } from "../api/fetchMovieDetailApi";
import { POPULAR_PATH, SEARCH_PATH } from "../../constants/constant";
import {
  showHeader,
  showSearchHeader,
  showMainTitle,
  showMovieList,
  showSkeleton,
  emptyMovie,
  showMoreMovie,
  openModal,
  updateModalRating,
  closeModal,
} from "./renderHandlers";
import { userErrorMessage } from "../../utils/userErrorMessage";
import { setRating } from "../../utils/setRating";
import { getRating } from "../../utils/getRating";

let page: number = 1;
let searchMovie: string = "";
let totalPage: number = 0;

export async function controlInitialMovies(): Promise<void> {
  try {
    page = 1;
    searchMovie = "";
    showMainTitle("지금 인기 있는 영화");
    showSkeleton();

    const data = await fetchMoviesApi(POPULAR_PATH, page);
    showHeader(data.results[0]);
    showMovieList(data);
    totalPage = data.total_pages;
  } catch (error) {
    alert(userErrorMessage(error));
    totalPage = 0;
  }
}

export async function controlSearchMovies(
  page: number,
  searchMovie: string,
): Promise<void> {
  try {
    showMainTitle(`"${searchMovie}" 검색 결과`);
    showSkeleton();

    const data = await fetchMoviesApi(SEARCH_PATH, page, searchMovie);
    showSearchHeader(searchMovie);

    if (data.results.length === 0) {
      emptyMovie();
    } else {
      showMovieList(data);
    }
    totalPage = data.total_pages;
  } catch (error) {
    alert(userErrorMessage(error));
    totalPage = 0;
  }
}

export async function appendNextPageMovies(
  page: number,
  searchMovie: string,
): Promise<boolean> {
  try {
    const data =
      searchMovie === ""
        ? await fetchMoviesApi(POPULAR_PATH, page)
        : await fetchMoviesApi(SEARCH_PATH, page, searchMovie);
    showMoreMovie(data);
    return true;
  } catch (error) {
    alert(userErrorMessage(error));
    return false;
  }
}

export async function controlModal(id: number): Promise<void> {
  if (!id) {
    return;
  }

  try {
    const data = await fetchMovieDetailApi(id);
    const rating = getRating(id);
    openModal(data, rating!);
  } catch (error) {
    alert(userErrorMessage(error));
  }
}

export function setMovieRating(id: number, rating: number): void {
  if (!id || !rating) {
    return;
  }

  setRating(id, rating);
  updateModalRating(rating);
}

export async function controlSearchSubmit(keyword: string): Promise<void> {
  page = 1;
  searchMovie = keyword;

  if (searchMovie === "") {
    await controlInitialMovies();
    return;
  }

  await controlSearchMovies(page, searchMovie);
}

export async function controlScroll(
  innerHeight: number,
  scrollY: number,
  scrollHeight: number,
): Promise<void> {
  if (innerHeight + scrollY < scrollHeight - 1) {
    return;
  }

  if (page >= totalPage) {
    return;
  }

  const isSuccess = await appendNextPageMovies(page + 1, searchMovie);

  if (isSuccess) {
    page += 1;
  }
}

export function controlModalClose(modalBackground: HTMLElement | null): void {
  if (!modalBackground) {
    return;
  }

  closeModal(modalBackground);
}
