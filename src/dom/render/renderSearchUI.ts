import { Movie } from "../../apis/movie/api";
import { getSearchedMovies } from "../../apis/search/api";
import TMDBError from "../../TMDBError";
import {
  renderSearch,
  renderSearchEmpty,
  renderSearchError,
  renderSearchLoading,
} from "../../pages/search";

export const renderSearchUI = async (keyword: string) => {
  const searchInput = document.getElementById(
    "search-input",
  ) as HTMLInputElement;
  searchInput.value = keyword;

  let isError = false;
  let isLastPage = true;
  let movies: Movie[] = [];
  let errorMessage = "";

  if (searchInput?.value.trim() === "") return;

  const url = new URL(window.location.href);
  const page = Number(url.searchParams.get("page")) || 1;

  try {
    renderSearchLoading(keyword);

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
    } else {
      renderSearch(isLastPage, movies);
    }
  }
};
