import { Movie } from "../../apis/movie/type";
import {
  renderMovieItems,
  renderMovieItemsLoading,
} from "../shared/MovieItem.ts";

const POPULAR_THUMBNAIL_LIST_ID = "popular-thumbnail-list";

let popularThumbnailList: HTMLElement | null = null;

const createPopularThumbnailListTemplate = () => `
  <ul class="thumbnail-list" id="${POPULAR_THUMBNAIL_LIST_ID}"></ul>
`;

export const renderPopularThumbnailLoading = (parent: HTMLElement) => {
  if (popularThumbnailList) {
    popularThumbnailList.remove();
  }

  parent.insertAdjacentHTML("beforeend", createPopularThumbnailListTemplate());
  popularThumbnailList = document.getElementById(POPULAR_THUMBNAIL_LIST_ID);

  if (popularThumbnailList) {
    renderMovieItemsLoading(popularThumbnailList);
  }
};

export const renderPopularThumbnailList = (
  parent: HTMLElement,
  movies: Movie[],
) => {
  if (popularThumbnailList) {
    popularThumbnailList.remove();
  }

  parent.insertAdjacentHTML("beforeend", createPopularThumbnailListTemplate());
  popularThumbnailList = document.getElementById(POPULAR_THUMBNAIL_LIST_ID);

  if (popularThumbnailList && movies.length > 0) {
    renderMovieItems(popularThumbnailList, movies);
  }
};

export const removePopularThumbnailList = () => {
  popularThumbnailList?.remove();
  popularThumbnailList = null;
};
