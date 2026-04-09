import { getPopularMovies } from "../../apis/movie/api";
import { getSearchedMovies } from "../../apis/search/api";
import TMDBError from "../../TMDBError";
import { renderMain, renderSearch } from "../render/renderResultSectionContent";
import { renderThumbnailList } from "../shared/ThumbnailList";

export const handleMainSeeMore = async () => {
  const mainThumbnailList = document.getElementById("main-thumbnail-list");
  if (!mainThumbnailList) return;

  const url = new URL(window.location.href);
  const params = url.searchParams;
  const prevPage = Number(params.get("page") || 1);

  params.set("page", String(prevPage + 1));
  url.search = params.toString();
  window.history.pushState({}, "", url.toString());

  try {
    const popularMovies = await getPopularMovies({
      page: prevPage + 1,
      language: "ko-KR",
    });
    const isLastPage = popularMovies.page === popularMovies.total_pages;
    const movies = popularMovies.results;

    renderThumbnailList(mainThumbnailList, movies);
    renderMain(isLastPage);
  } catch (error) {
    let errorMessage = "알 수 없는 에러가 발생했습니다.";
    if (error instanceof TMDBError) {
      errorMessage = "TMDB에서 데이터를 불러오는 중 에러가 발생했습니다";
    }
    window.alert(errorMessage);
  }
};

export const handleSearchSeeMore = async (keyword: string) => {
  const searchThumbnailList = document.getElementById("search-thumbnail-list");
  if (!searchThumbnailList) return;

  const url = new URL(window.location.href);
  const params = url.searchParams;
  const prevPage = Number(params.get("page") || 1);

  params.set("page", String(prevPage + 1));
  url.search = params.toString();
  window.history.pushState({}, "", url.toString());

  try {
    const searchResult = await getSearchedMovies({
      query: keyword,
      page: prevPage + 1,
      language: "ko-KR",
    });
    const isLastPage = searchResult.page === searchResult.total_pages;
    const movies = searchResult.results;

    renderThumbnailList(searchThumbnailList, movies);
    renderSearch(isLastPage);
  } catch (error) {
    let errorMessage = "알 수 없는 에러가 발생했습니다.";
    if (error instanceof TMDBError) {
      errorMessage = "TMDB에서 데이터를 불러오는 중 에러가 발생했습니다";
    }
    window.alert(errorMessage);
  }
};
