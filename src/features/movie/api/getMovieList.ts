import { IMovieList } from "../../../shared/types/movies";
import { apiClient } from "../../../shared/utils/apiClient";

export const getMovieList = async ({
  page,
}: {
  page: number;
}): Promise<IMovieList | void> => {
  try {
    return await apiClient("GET", `/tv/popular?page=${page}`);
  } catch (error) {
    throw new Error("영화 리스트를 불러오는데 실패하였습니다.");
  }
};
