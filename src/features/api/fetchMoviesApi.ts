import { Movie } from "../../../types/types";
import { API_KEY, BASE_URL } from "../../constants/api";

export async function fetchMoviesApi(
  path: string,
  page: number,
  params: string = "",
) {
  const queryUrl: string =
    params === "" ? "" : `&query=${encodeURIComponent(params)}`;

  const response = await fetch(
    `${BASE_URL}/${path}?api_key=${API_KEY}${queryUrl}&language=ko-KR&page=${page}`,
  );
  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }
  const data: { results: Movie[]; total_pages: number } = await response.json();

  return data;
}
