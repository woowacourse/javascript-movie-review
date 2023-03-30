import { API_BASE_URL } from "../constants";
import { MovieDataType, MovieDetail } from "../types/movie";
import { HTTPError } from "./HTTPError";

const fetchPopularMovieData = async (currentPage: number) => {
  const response = await fetch(
    `${API_BASE_URL}movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${currentPage}`
  );

  if (!response.ok) throw new HTTPError(response.status);

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

  if (!response.ok) throw new HTTPError(response.status);

  const movieData: MovieDataType = await response.json();

  return movieData.results;
};

const fetchDetailedMovieData = async (movieId: number) => {
  const response = await fetch(
    `${API_BASE_URL}movie/${movieId}?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR`
  );

  if (!response.ok) throw new HTTPError(response.status);

  const movieData: MovieDetail = await response.json();

  return movieData;
};

export {
  fetchPopularMovieData,
  fetchSearchedMovieData,
  fetchDetailedMovieData,
};
