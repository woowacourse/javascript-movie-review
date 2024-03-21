import { getMovieData } from "./getMovieData";

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular`;

export const getPopularMoviesData = async (currentPage: string) => {
  if (typeof API_KEY === "string") {
    const params = {
      api_key: API_KEY,
      language: "ko-KR",
      page: currentPage,
    };

    const popularMovieUrl = `${POPULAR_MOVIES_URL}?${new URLSearchParams(
      params
    ).toString()}`;

    try {
      const popularMovies = await getMovieData(popularMovieUrl);
      if (popularMovies && popularMovies.results) {
        return popularMovies.results;
      } else {
        throw new Error("인기 영화를 불러오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("인기 영화 정보를 가져오는 중 오류 발생:", error);
      throw new Error("인기 영화를 불러오는데 실패했습니다.");
    }
  } else {
    // NOTE: API_KEY가 문자열이 아닌 경우
    console.error("API_KEY가 유효하지 않습니다.");
    throw new Error("API_KEY가 유효하지 않습니다.");
  }
};
