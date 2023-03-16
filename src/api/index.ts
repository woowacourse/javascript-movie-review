import { API_BASE_URL } from "../constants";
import { MovieDataType } from "../types/movie";

const fetchPopularMovieData = async (currentPage: number) => {
  const response = await fetch(
    `${API_BASE_URL}movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${currentPage}`
  );
  const movieData: MovieDataType = await response.json();

  return movieData.results;
};

const fetchSearchedMovieData = async (
  searchKey: string,
  currentPage: number
) => {
  const response = await fetch(
    `${API_BASE_URL}search/movie?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&query=${searchKey}&page=${currentPage}&include_adult=false`
  );
  const movieData: MovieDataType = await response.json();

  return movieData.results;
};

export { fetchPopularMovieData, fetchSearchedMovieData };
