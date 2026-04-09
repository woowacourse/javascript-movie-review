import { Movie } from "../../apis/movie/api";
import { renderThumbnailList } from "../shared/ThumbnailList";

const SEARCH_THUMBNAIL_LIST_ID = "search-thumbnail-list";

let searchThumbnailList: HTMLElement | null = null;

const createSearchThumbnailListTemplate = () => `
  <ul class="thumbnail-list" id="${SEARCH_THUMBNAIL_LIST_ID}"></ul>
`;

export const renderSearchThumbnailList = (parent: HTMLElement, movies: Movie[]) => {
  if (searchThumbnailList) {
    searchThumbnailList.remove();
  }

  parent.insertAdjacentHTML("beforeend", createSearchThumbnailListTemplate());
  searchThumbnailList = document.getElementById(SEARCH_THUMBNAIL_LIST_ID);

  if (searchThumbnailList && movies.length > 0) {
    renderThumbnailList(searchThumbnailList, movies);
  }
};

export const removeSearchThumbnailList = () => {
  searchThumbnailList?.remove();
  searchThumbnailList = null;
};
