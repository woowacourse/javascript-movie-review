import { apiClient } from "./apiClient";

export const fetchSearchMovieList = async (
  search: string,
  currentPage: number
) =>
  apiClient.get(
    `/search/movie?query=${search}&include_adult=false&language=ko-KR&page=${currentPage}`
  );
