import { Movie } from "../apis/movie/type.ts";
import { getSearchedMovies } from "../apis/search/api.ts";
import TMDBError from "../TMDBError.ts";
import {
  appendSearchedMovies,
  renderSearch,
  renderSearchEmpty,
  renderSearchError,
  renderSearchLoading,
} from "../dom/compositions/Search.ts";

export const renderSearchPage = async (type: "init" | "append") => {
  let isError = false;
  let isLastPage = true;
  let movies: Movie[] = [];
  let errorMessage = "";

  const url = new URL(window.location.href);
  const keyword = url.searchParams.get("keyword") || "";
  const page = Number(url.searchParams.get("page")) || 1;
  if (keyword.trim() === "") return;

  const searchInput = document.getElementById(
    "search-input",
  ) as HTMLInputElement;

  if (searchInput) {
    searchInput.value = keyword;
  }

  try {
    if (type === "init") {
      renderSearchLoading(keyword);
    }

    const searchResult = await getSearchedMovies({
      query: keyword,
      language: "ko-KR",
      page,
    });

    isLastPage = searchResult.page === searchResult.total_pages;
    movies = searchResult.results;
  } catch (error) {
    isError = true;
    errorMessage = "🚨알 수 없는 에러가 발생했습니다.🚨";
    if (error instanceof TMDBError) {
      errorMessage = "🚨TMDB에서 데이터를 불러오는 중 에러가 발생했습니다🚨";
    }
  } finally {
    if (isError) {
      renderSearchError(errorMessage);
    } else if (movies.length === 0) {
      renderSearchEmpty();
    } else if (type === "init") {
      renderSearch(isLastPage, movies);
    } else {
      appendSearchedMovies(isLastPage, movies);
    }
  }
};
