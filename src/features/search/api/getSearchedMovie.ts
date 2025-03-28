import { IMovieList } from "../../../shared/types/movies";
import { apiClient } from "../../../shared/apis/apiClient";

export const getSearchedMovie = async (
  query: string,
  page: number
): Promise<IMovieList | undefined> => {
  try {
    return await apiClient(
      "GET",
      `/search/movie?query=${query}&include_adult=true&language=ko-KR&page=${page}`
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
