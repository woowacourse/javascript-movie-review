import { MovieResponse } from "../../../types/types";
import { API_KEY, BASE_URL } from "../../constants/api";

export async function fetchMoviesApi(
  path: string,
  page: number,
  query: string = "",
) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    language: "ko-KR",
    page: String(page),
    ...(query && { query }),
  });

  const response = await fetch(`${BASE_URL}/${path}?${params}`);
  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }
  const data: MovieResponse = await response.json();

  return data;
}
