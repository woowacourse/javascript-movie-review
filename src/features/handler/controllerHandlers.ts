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
} from "./renderHandlers";
import { userErrorMessage } from "../../utils/userErrorMessage";
import { setRating } from "../../utils/setRating";

export async function controlInitialMovies(page: number): Promise<number> {
  try {
    showMainTitle("지금 인기 있는 영화");
    showSkeleton();

    const data = await fetchMoviesApi(POPULAR_PATH, page);
    showHeader(data.results[0]);
    showMovieList(data);
    return data.total_pages;
  } catch (error) {
    alert(userErrorMessage(error));
    return 0;
  }
}

export async function controlSearchMovies(
  page: number,
  searchMovie: string,
): Promise<number> {
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
    return data.total_pages;
  } catch (error) {
    alert(userErrorMessage(error));
    return 0;
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
  try {
    const data = await fetchMovieDetailApi(id);
    openModal(data);
  } catch (error) {
    alert(userErrorMessage(error));
  }
}

export function setMovieRating(id: number, rating: number): void {
  setRating(id, rating);
  updateModalRating(rating);
}
