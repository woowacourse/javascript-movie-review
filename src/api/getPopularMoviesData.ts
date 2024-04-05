import { fetchData } from "./fetchData";
import Movie from "../movie/Movie";

const API_KEY = process.env.API_KEY as string;
const BASE_URL = "https://api.themoviedb.org/3";
const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular`;

export const getPopularMoviesData = async (currentPage: string) => {
  if (!API_KEY) {
    throw new Error(
      "유효하지 않은 API 키입니다. API 키를 확인하고 다시 시도해주세요."
    );
  }

  const params = {
    api_key: API_KEY,
    language: "ko-KR",
    page: currentPage,
  };

  const popularMovieUrl = `${POPULAR_MOVIES_URL}?${new URLSearchParams(
    params
  ).toString()}`;

  const popularMovies = await fetchData(popularMovieUrl);

  if (popularMovies && popularMovies.results) {
    const movies = popularMovies.results.map(
      (item: IMovieItemData) => new Movie(item)
    );
    return movies;
  } else {
    throw new Error("인기 영화를 불러오는데 실패했습니다.");
  }
};
