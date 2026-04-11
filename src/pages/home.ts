import { getPopularMovies } from "../apis/movie/api.ts";
import { Movie } from "../apis/movie/type.ts";
import TMDBError from "../TMDBError.ts";
import {
  appendPopularMovies,
  renderMain,
  renderMainEmpty,
  renderMainError,
  renderMainLoading,
} from "../dom/compositions/Main.ts";

export const renderHomePage = async (type: "init" | "append") => {
  let isError = false;
  let isLastPage = true;
  let movies: Movie[] = [];
  let errorMessage = "";

  const url = new URL(window.location.href);
  const page = Number(url.searchParams.get("page")) || 1;

  try {
    if (type === "init") {
      renderMainLoading();
    }

    const popularMovies = await getPopularMovies({
      language: "ko-KR",
      page,
    });
    isLastPage = popularMovies.page === popularMovies.total_pages;
    movies = popularMovies.results;
  } catch (error) {
    isError = true;
    errorMessage = "🚨알 수 없는 에러가 발생했습니다.🚨";
    if (error instanceof TMDBError) {
      errorMessage = "🚨TMDB에서 데이터를 불러오는 중 에러가 발생했습니다🚨";
    }
  } finally {
    if (isError) {
      renderMainError(errorMessage);
    } else if (movies.length === 0) {
      renderMainEmpty();
    } else if (type === "init") {
      renderMain(isLastPage, movies);
    } else {
      appendPopularMovies(isLastPage, movies);
    }
  }
};
