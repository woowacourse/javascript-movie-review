import { IMovieList } from "../../../shared/types/movies";
import { apiClient } from "../../../shared/apis/apiClient";

export const getMovieList = async ({
  page,
}: {
  page: number;
}): Promise<IMovieList | undefined> => {
  try {
    return await apiClient("GET", `/tv/popular?page=${page}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
