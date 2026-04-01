import { getSearchedMovies } from "../../apis/search/api";
import { renderResultSectionContent } from "../render/renderResultSectionContent";
import { renderThumbnailList } from "../render/renderThumbnailList";

export const handleMovieSearch = async (keyword: string) => {
  const searchInput = document.getElementById(
    "search-input",
  ) as HTMLInputElement | null;
  const banner = document.getElementById("background-container");
  const resultSection = document.getElementById("result-section");
  const subTitle = document.getElementById("sub-title");
  const thumbnailListElement = document.getElementById("search-thumbnail-list");

  if (!banner || !subTitle || searchInput?.value.trim() === "") return;

  const searchResult = await getSearchedMovies({
    query: keyword,
    language: "ko-KR",
    page: 1,
  });
  if (searchResult) {
    banner.hidden = true;
    resultSection?.classList.add("result-section");
    subTitle.innerText = `"${keyword}" 검색 결과`;
    const isLastPage = searchResult.page === searchResult.total_pages;
    const movies = searchResult.results;
    renderResultSectionContent({
      isLoading: false,
      isError: false,
      isLastPage,
      type: "search",
      movies,
    });
    renderThumbnailList({ movies, thumbnailListElement });
  }
};
