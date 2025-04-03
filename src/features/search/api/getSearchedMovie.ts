import { IMovieList } from "../../movie/types/movies";
import { apiClient } from "../../../shared/apis/apiClient";

export const getSearchedMovie = async (
  query: string,
  page: number
): Promise<IMovieList | undefined> => {
  return await apiClient.get(
    `/search/movie?query=${query}&include_adult=true&language=ko-KR&page=${page}`
  );
};
