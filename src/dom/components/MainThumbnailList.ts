import { Movie } from "../../apis/movie/api";
import { renderThumbnailList } from "../shared/ThumbnailList";

const MAIN_THUMBNAIL_LIST_ID = "main-thumbnail-list";

let mainThumbnailList: HTMLElement | null = null;

const createMainThumbnailListTemplate = () => `
  <ul class="thumbnail-list" id="${MAIN_THUMBNAIL_LIST_ID}"></ul>
`;

export const renderMainThumbnailList = (parent: HTMLElement, movies: Movie[]) => {
  if (mainThumbnailList) {
    mainThumbnailList.remove();
  }

  parent.insertAdjacentHTML("beforeend", createMainThumbnailListTemplate());
  mainThumbnailList = document.getElementById(MAIN_THUMBNAIL_LIST_ID);

  if (mainThumbnailList && movies.length > 0) {
    renderThumbnailList(mainThumbnailList, movies);
  }
};

export const removeMainThumbnailList = () => {
  mainThumbnailList?.remove();
  mainThumbnailList = null;
};
