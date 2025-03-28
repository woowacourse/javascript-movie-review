import { apiClient } from "../../../shared/apis/apiClient";

export const getMovieDetails = async (id: number) => {
  {
    try {
      return await apiClient("GET", `/movie/${id}`);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
