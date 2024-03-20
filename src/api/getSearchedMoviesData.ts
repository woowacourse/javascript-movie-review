import { getMovieData } from "./getMovieData";

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_SEARCH_URL = `${BASE_URL}/search/movie`;

export const getSearchedMoviesData = async (
  currentPage: string,
  title: string
) => {
  if (typeof API_KEY === "string") {
    const params = {
      api_key: API_KEY,
      language: "ko-KR",
      page: currentPage,
      query: `${title}`,
    };

    const searchMovieUrl = `${MOVIE_SEARCH_URL}?${new URLSearchParams(
      params
    ).toString()}`;

    try {
      const searchedMovies = await getMovieData(searchMovieUrl);
      if (searchedMovies && searchedMovies.results) {
        return searchedMovies.results;
      } else {
        throw new Error("영화 검색에 실패했습니다.");
      }
    } catch (error) {
      console.error("영화 정보를 검색하는 중 오류 발생:", error);
      return [];
    }
  }
};
