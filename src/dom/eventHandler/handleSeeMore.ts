import { getPopularMovies } from "../../apis/movie/api";
import { getSearchedMovies } from "../../apis/search/api";
import TMDBError from "../../TMDBError";
import { renderMain } from "../../pages/home.ts";
import { renderSearch } from "../../pages/search.ts";

export const handleMainSeeMore = async () => {
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

    renderMain(isLastPage, movies);
  } catch (error) {
    let errorMessage = "알 수 없는 에러가 발생했습니다.";
    if (error instanceof TMDBError) {
      errorMessage = "TMDB에서 데이터를 불러오는 중 에러가 발생했습니다";
    }
    window.alert(errorMessage);
  }
};

export const handleSearchSeeMore = async (keyword: string) => {
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

    renderSearch(isLastPage, movies);
  } catch (error) {
    let errorMessage = "알 수 없는 에러가 발생했습니다.";
    if (error instanceof TMDBError) {
      errorMessage = "TMDB에서 데이터를 불러오는 중 에러가 발생했습니다";
    }
    window.alert(errorMessage);
  }
};
