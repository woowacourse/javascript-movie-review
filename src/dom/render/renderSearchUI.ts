import { Movie } from "../../apis/movie/api";
import { getSearchedMovies } from "../../apis/search/api";
import TMDBError from "../../TMDBError";
import { renderResultSectionContent } from "./renderResultSectionContent";
import { renderThumbnailList } from "./renderThumbnailList";
import { renderLoadingUI } from "./renderLoadingUI.ts";

export const renderSearchUI = async (keyword: string) => {
  const searchInput = document.getElementById(
    "search-input",
  ) as HTMLInputElement;
  const thumbnailListElement = document.getElementById("search-thumbnail-list");
  searchInput.value = keyword;

  let isError = false;
  let isLastPage = true;
  let movies: Movie[] = [];
  let errorMessage = "";

  if (searchInput?.value.trim() === "") return;

  try {
    renderLoadingUI();

    const searchResult = await getSearchedMovies({
      query: keyword,
      language: "ko-KR",
      page: 1,
    });

    isLastPage = searchResult.page === searchResult.total_pages;
    movies = searchResult.results;
    renderThumbnailList({ movies, thumbnailListElement });
  } catch (error) {
    isError = true;
    errorMessage = "🚨알 수 없는 에러가 발생했습니다.🚨";
    if (error instanceof TMDBError) {
      errorMessage = "🚨TMDB에서 데이터를 불러오는 중 에러가 발생했습니다🚨";
    }
  } finally {
    renderResultSectionContent({
      isLoading: false,
      isError,
      errorMessage,
      movies,
      isLastPage,
    });
  }
};
