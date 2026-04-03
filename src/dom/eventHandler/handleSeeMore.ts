import { getPopularMovies } from "../../apis/movie/api";
import { getSearchedMovies } from "../../apis/search/api";
import { renderThumbnailList } from "../render/renderThumbnailList";

export const handleMainSeeMore = async () => {
  const mainThumbnailList = document.getElementById("main-thumbnail-list");
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const prevPage = Number(params.get("page") || 1);

  params.set("page", String(prevPage + 1));
  url.search = params.toString();
  window.history.pushState({}, "", url.toString());

  const movies = await getPopularMovies({
    page: prevPage + 1,
    language: "ko-KR",
  });

  renderThumbnailList({
    movies: movies.results,
    thumbnailListElement: mainThumbnailList,
  });
};

export const handleSearchSeeMore = async (keyword: string) => {
  const mainThumbnailList = document.getElementById("search-thumbnail-list");
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const prevPage = Number(params.get("page") || 1);

  params.set("page", String(prevPage + 1));
  url.search = params.toString();
  window.history.pushState({}, "", url.toString());

  const movies = await getSearchedMovies({
    query: keyword,
    page: prevPage + 1,
    language: "ko-KR",
  });

  renderThumbnailList({
    movies: movies.results,
    thumbnailListElement: mainThumbnailList,
  });
};
