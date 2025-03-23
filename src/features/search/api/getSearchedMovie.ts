import { IMovieList } from "../../../shared/types/movies";
import { apiClient } from "../../../shared/utils/apiClient";

export const getSearchedMovie = async (
  query: string,
  page: number
): Promise<IMovieList | void> => {
  try {
    return await apiClient(
      "GET",
      `/search/movie?query=${query}&include_adult=true&language=ko-KR&page=${page}`
    );
  } catch (error) {
    throw new Error("검색 결과를 불러오는데 실패하였습니다.");
  }
};
