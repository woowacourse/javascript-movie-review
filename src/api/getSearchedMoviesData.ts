import { getMovieData } from "./getMovieData";
import Movie from "../movie/Movie";

const API_KEY = process.env.API_KEY as string;
const BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_SEARCH_URL = `${BASE_URL}/search/movie`;

export const getSearchedMoviesData = async (
  currentPage: string,
  title: string
) => {
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
      const movies = searchedMovies.results.map(
        (item: IMovieItemData) => new Movie(item)
      );
      return movies;
    } else {
      throw new Error("서버에서 영화 데이터를 불러오는데 실패했습니다.");
    }
  } catch (error) {
    throw new Error("네트워크 오류로 인해 영화 검색에 실패했습니다.");
  }
};
