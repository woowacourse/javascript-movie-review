import { getPopularMovies } from "../../apis/movie/api";
import { getSearchedMovies } from "../../apis/search/api";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { renderError } from "../render/renderError";
import { renderThumbnailList } from "../render/renderThumbnailList";

export const handleMainSeeMore = async () => {
  const mainThumbnailList = document.getElementById("main-thumbnail-list");
  const mainErrorContainer = document.getElementById("main-error-container");
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const prevPage = Number(params.get("page") || 1);

  params.set("page", String(prevPage + 1));
  url.search = params.toString();
  window.history.pushState({}, "", url.toString());

  try {
    const movies = await getPopularMovies({
      page: prevPage + 1,
      language: "ko-KR",
    });
    renderThumbnailList({
      movies: movies.results,
      thumbnailListElement: mainThumbnailList,
    });
  } catch (error) {
    renderError({
      container: mainErrorContainer,
      message: getErrorMessage(error),
    });
  }
};

export const handleSearchSeeMore = async (keyword: string) => {
  const searchThumbnailList = document.getElementById("search-thumbnail-list");
  const mainErrorContainer = document.getElementById("main-error-container");

  const url = new URL(window.location.href);
  const params = url.searchParams;
  const prevPage = Number(params.get("page") || 1);

  params.set("page", String(prevPage + 1));
  url.search = params.toString();
  window.history.pushState({}, "", url.toString());

  try {
    const movies = await getSearchedMovies({
      query: keyword,
      page: prevPage + 1,
      language: "ko-KR",
    });
    renderThumbnailList({
      movies: movies.results,
      thumbnailListElement: searchThumbnailList,
    });
  } catch (error) {
    renderError({
      container: mainErrorContainer,
      message: getErrorMessage(error),
    });
  }
};
