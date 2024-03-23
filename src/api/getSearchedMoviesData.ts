import { getData } from "./getData";

const API_KEY = process.env.API_KEY as string;
const BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_SEARCH_URL = `${BASE_URL}/search/movie`;

export const getSearchedMoviesData = async (
  currentPage: string,
  title: string
) => {
  if (!API_KEY) {
    console.error("API_KEY가 유효하지 않습니다.");
    throw new Error("API_KEY가 유효하지 않습니다.");
  }

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
    const searchedMovies = await getData(searchMovieUrl);
    if (searchedMovies && searchedMovies.results) {
      return searchedMovies.results;
    } else {
      throw new Error("검색 결과를 불러오는데 실패했습니다.");
    }
  } catch (error) {
    throw new Error("검색 결과를 불러오는데 실패했습니다.");
  }
};
