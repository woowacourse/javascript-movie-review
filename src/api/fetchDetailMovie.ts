import { apiClient } from "./apiClient";

export const fetchDetailMovie = async (id: number) =>
  apiClient.get(`/movie/${id}?language=ko-KR';`);
