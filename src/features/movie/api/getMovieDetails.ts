import { apiClient } from "../../../shared/apis/apiClient";

export const getMovieDetails = async (id: string) => {
  {
    try {
      return await apiClient("GET", `/movie/${id}?language=en-US'`);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};
