import { apiClient } from "./apiClient";

export const fetchPopularMovieList = async (currentPage: number) =>
  apiClient.get(
    `/movie/popular?include_adult=false&language=ko-KR&page=${currentPage}`
  );

export const fetchSearchMovieList = async (
  search: string,
  currentPage: number
) =>
  apiClient.get(
    `/search/movie?query=${search}&include_adult=false&language=ko-KR&page=${currentPage}`
  );
