import { Movie } from "../../../types/types";
import { API_KEY, BASE_URL } from "../../constants/constant";
import { POPULAR_PATH, SEARCH_PATH } from "../../constants/constant";

export async function fetchPopularMovies(
  page: number,
): Promise<{ results: Movie[]; total_pages: number }> {
  return await fetchApi(POPULAR_PATH, page);
}

export async function fetchSearchMovies(
  page: number,
  searchMovie?: string,
): Promise<{ results: Movie[]; total_pages: number }> {
  if (searchMovie) {
    return await fetchApi(SEARCH_PATH, page, searchMovie);
  }

  return await fetchApi(POPULAR_PATH, page, searchMovie);
}

async function fetchApi(path: string, page: number, params: string = "") {
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
