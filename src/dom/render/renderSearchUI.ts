import { Movie } from "../../apis/movie/api";
import { getSearchedMovies } from "../../apis/search/api";
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
  searchInput.value = keyword;

  let isError = false;
  let isLastPage = true;
  let movies: Movie[] = [];

  if (!banner || !subTitle || searchInput?.value.trim() === "") return;

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
  } finally {
    renderResultSectionContent({
      isLoading: false,
      isError,
      movies,
      type: "search",
      isLastPage,
    });
  }
};
