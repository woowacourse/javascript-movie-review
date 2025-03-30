import { apiClient } from "../../../shared/apis/apiClient";

export const getMovieDetails = async (id: number) => {
  {
    return await apiClient.get(`/movie/${id}`);
  }
};
