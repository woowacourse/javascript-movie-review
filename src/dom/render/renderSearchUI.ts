import { Movie } from "../../apis/movie/api";
import { getSearchedMovies } from "../../apis/search/api";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { renderResultSectionContent } from "./renderResultSectionContent";
import { renderThumbnailList } from "./renderThumbnailList";

export const renderSearchUI = async (keyword: string) => {
  const searchInput = document.getElementById(
    "search-input",
  ) as HTMLInputElement;
  const banner = document.getElementById("background-container");
  const resultSection = document.getElementById("result-section");
  const subTitle = document.getElementById("sub-title");
  const thumbnailListElement = document.getElementById("search-thumbnail-list");
  if (!searchInput || !banner || !subTitle || searchInput?.value.trim() === "")
    return;

  searchInput.value = keyword;

  let isError = false;
  let isLastPage = true;
  let movies: Movie[] = [];
  let errorMessage = "";

  try {
    const searchResult = await getSearchedMovies({
      query: keyword,
      language: "ko-KR",
      page: 1,
    });

    banner.hidden = true;
    resultSection?.classList.add("result-section");
    subTitle.innerText = `"${keyword}" 검색 결과`;

    isLastPage = searchResult.page === searchResult.total_pages;
    movies = searchResult.results;
    renderThumbnailList({ movies, thumbnailListElement });
  } catch (error) {
    isError = true;
    errorMessage = getErrorMessage(error);
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
