import { getData } from "./getData";

const API_KEY = process.env.API_KEY as string;
const BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_SEARCH_URL = `${BASE_URL}/search/movie`;

export const getSearchedMoviesData = async (
  currentPage: string,
  title: string
) => {
  if (!API_KEY) {
    throw new Error(
      "유효하지 않은 API 키입니다. 올바른 API 키를 확인하고 다시 시도해주세요."
    );
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

  const searchedMovies = await getData(searchMovieUrl);
  if (searchedMovies.results.length === 0) {
    throw new Error(
      "해당 키워드로 작품을 찾을 수 없습니다. 다른 키워드를 입력해주세요."
    );
  }

  return searchedMovies.results;
};
