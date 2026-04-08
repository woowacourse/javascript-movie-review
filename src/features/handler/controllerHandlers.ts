import { fetchMoviesApi } from "../api/fetchMoviesApi";
import { fetchMovieDetailApi } from "../api/fetchMovieDetailApi";
import { POPULAR_PATH, SEARCH_PATH } from "../../constants/constant";
import {
  handleHeader,
  handleHeaderSearch,
  handleMainTitle,
  handleMovieList,
  handleSkeleton,
  handleEmptyMovie,
  handleMoreMovie,
  handleModal,
} from "./renderHandlers";
import { userErrorMessage } from "../../utils/userErrorMessage";

export async function controlInitialMovies(page: number): Promise<void> {
  try {
    handleMainTitle("지금 인기 있는 영화");
    handleSkeleton();

    const data = await fetchMoviesApi(POPULAR_PATH, page);
    handleHeader(data.results[0]);
    handleMovieList(data);
  } catch (error) {
    alert(userErrorMessage(error));
  }
}

export async function controlSearchMovies(
  page: number,
  searchMovie: string,
): Promise<void> {
  try {
    handleMainTitle(`"${searchMovie}" 검색 결과`);
    handleSkeleton();

    const data = await fetchMoviesApi(SEARCH_PATH, page, searchMovie);
    handleHeaderSearch(searchMovie);

    if (data.results.length === 0) {
      handleEmptyMovie();
    } else {
      handleMovieList(data);
    }
  } catch (error) {
    alert(userErrorMessage(error));
  }
}

export async function controlMoreMovies(
  page: number,
  searchMovie: string,
): Promise<void> {
  try {
    const data =
      searchMovie === ""
        ? await fetchMoviesApi(POPULAR_PATH, page)
        : await fetchMoviesApi(SEARCH_PATH, page, searchMovie);
    handleMoreMovie(data);
  } catch (error) {
    alert(userErrorMessage(error));
  }
}

export async function controlModal(id: number): Promise<void> {
  try {
    const data = await fetchMovieDetailApi(id);
    handleModal(data);
  } catch (error) {
    alert(userErrorMessage(error));
  }
}
