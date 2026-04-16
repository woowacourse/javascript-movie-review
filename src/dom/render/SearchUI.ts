import { Movie } from "../../apis/movie/api";
import { getSearchedMovies } from "../../apis/search/api";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { getKeywordFromURL } from "../../utils/getKeywordFromURL";
import { getPageParam, incrementPageParam } from "../../utils/pageParams";
import { renderThumbnailList } from "./renderThumbnailList";

type SearchState =
  | { type: "loading" }
  | { type: "data"; movies: Movie[]; isLastPage: boolean }
  | { type: "error"; message: string }
  | { type: "empty" };

class SearchUI {
  searchState: SearchState = { type: "loading" };
  searchThumbnailList = document.getElementById("search-thumbnail-list");
  searchSeeMoreButton = document.getElementById("search-see-more-button");
  skeletonList = document.getElementById("skeleton-list");
  errorContainer = document.getElementById("error-container");
  emptyContainer = document.getElementById("empty-container");
  resultSection = document.getElementById("result-section");
  subTitle = document.getElementById("sub-title");
  errorMessageContent = document.querySelector(
    "#error-container p",
  ) as HTMLParagraphElement;
  thumbnailListElement = document.getElementById(
    "search-thumbnail-list",
  ) as HTMLUListElement;

  keyword = getKeywordFromURL();

  constructor() {
    this.#render();
  }

  setSearchState(searchState: SearchState) {
    this.searchState = searchState;
    this.#render();
  }

  hide() {
    this.searchThumbnailList?.classList.add("hidden");
    this.searchSeeMoreButton?.classList.add("hidden");
    this.skeletonList?.classList.add("hidden");
    this.errorContainer?.classList.add("hidden");
    this.emptyContainer?.classList.add("hidden");
    this.errorMessageContent?.classList.add("hidden");
    this.subTitle?.classList.add("hidden");
  }

  async load() {
    this.setSearchState({ type: "loading" });
    this.thumbnailListElement.innerHTML = "";
    try {
      const keyword = getKeywordFromURL();
      const searchResult = await getSearchedMovies({
        query: keyword || "",
        language: "ko-KR",
        page: 1,
      });
      this.setSearchState({
        type: "data",
        movies: searchResult.results,
        isLastPage: searchResult.page === searchResult.total_pages,
      });
    } catch (error) {
      this.setSearchState({ type: "error", message: getErrorMessage(error) });
    }
  }

  async seeMore() {
    try {
      const searchedMovies = await getSearchedMovies({
        query: this.keyword || "",
        page: getPageParam() + 1,
        language: "ko-KR",
      });
      incrementPageParam();
      renderThumbnailList({
        movies: searchedMovies.results,
        thumbnailListElement: this.searchThumbnailList,
      });
      return !(searchedMovies.page === searchedMovies.total_pages);
    } catch (error) {
      this.setSearchState({ type: "error", message: getErrorMessage(error) });
    }
  }

  #render() {
    this.hide();
    this.resultSection?.classList.add("result-section");
    const keyword = getKeywordFromURL();
    if (!this.subTitle) return;
    this.subTitle?.classList.remove("hidden");
    this.subTitle.innerText = `"${keyword}" 검색 결과`;
    if (this.searchState.type === "data") {
      this.searchThumbnailList?.classList.remove("hidden");
      renderThumbnailList({
        movies: this.searchState.movies,
        thumbnailListElement: this.searchThumbnailList,
      });

      if (!this.searchState.isLastPage)
        this.searchSeeMoreButton?.classList.remove("hidden");
      else {
        this.searchSeeMoreButton?.classList.add("hidden");
      }
    }
    if (this.searchState.type === "empty") {
      this.emptyContainer?.classList.remove("hidden");
    }

    if (this.searchState.type === "error") {
      this.errorContainer?.classList.remove("hidden");
      this.errorMessageContent.innerText = this.searchState.message;
    }

    if (this.searchState.type === "loading") {
      this.skeletonList?.classList.remove("hidden");
    }
  }
}

export default SearchUI;
