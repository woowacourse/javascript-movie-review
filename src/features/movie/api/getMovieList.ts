import { IMovieList } from "../types/movies";
import { apiClient } from "../../../shared/apis/apiClient";

export const getMovieList = async ({
  page,
}: {
  page: number;
}): Promise<IMovieList | undefined> => {
  return await apiClient.get(`/movie/popular?page=${page}`);
};
