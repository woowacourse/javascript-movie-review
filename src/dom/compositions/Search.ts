import { Movie } from "../../apis/movie/type.ts";
import { handleSearchSeeMore } from "../eventHandler/handleSeeMore.ts";
import { removeEmptyContainer, renderEmptyContainer } from "../components/EmptyContainer.ts";
import { removeErrorContainer, renderErrorContainer } from "../components/ErrorContainer.ts";
import { removeSearchSeeMoreButton, renderSearchSeeMoreButton } from "../components/SearchSeeMoreButton.ts";
import { removeSearchThumbnailList, renderSearchThumbnailList, renderSearchThumbnailLoading } from "../components/SearchThumbnailList.ts";
import { removeMovieItemsLoading, renderMovieItems } from "../shared/MovieItem.ts";
import { removeMain } from "./Main.ts";

export const removeSearch = () => {
  removeSearchThumbnailList();
  removeSearchSeeMoreButton();
  removeErrorContainer();
  removeEmptyContainer();
};

export const renderSearchLoading = (keyword: string) => {
  removeMain();
  removeSearch();
  const resultSection = document.getElementById("result-section");
  const subTitle = document.getElementById("sub-title");

  if (resultSection) {
    resultSection.classList.add("result-section");
    renderSearchThumbnailLoading(resultSection);
  }
  if (subTitle) {
    subTitle.innerText = `"${keyword}" 검색 결과`;
  }
};

export const renderSearchError = (errorMessage?: string) => {
  removeMain();
  removeSearch();
  const resultSection = document.getElementById("result-section");
  if (resultSection) {
    renderErrorContainer(
      resultSection,
      errorMessage || "🚨문제가 발생했습니다.🚨",
    );
  }
};

export const renderSearchEmpty = () => {
  removeMain();
  removeSearch();
  const resultSection = document.getElementById("result-section");
  if (resultSection) {
    renderEmptyContainer(resultSection, "검색 결과가 없습니다.");
  }
};

export const renderSearch = (isLastPage: boolean, movies: Movie[]) => {
  removeMain();
  removeSearch();

  const resultSection = document.getElementById("result-section");
  if (!resultSection) return;

  renderSearchThumbnailList(resultSection, movies);

  if (isLastPage) {
    removeSearchSeeMoreButton();
  } else {
    renderSearchSeeMoreButton(resultSection, () => {
      handleSearchSeeMore();
    });
  }
};

export const appendSearchedMovies = (isLastPage: boolean, movies: Movie[]) => {
  const resultSection = document.getElementById("result-section");
  const searchThumbnailList = document.getElementById("search-thumbnail-list");
  if (!resultSection || !searchThumbnailList) return;

  removeMovieItemsLoading(searchThumbnailList as HTMLElement);
  renderMovieItems(searchThumbnailList as HTMLElement, movies);

  if (isLastPage) {
    removeSearchSeeMoreButton();
  } else {
    renderSearchSeeMoreButton(resultSection, () => {
      handleSearchSeeMore();
    });
  }
};
