import { Movie } from "../../types/types";
import { API_KEY, BASE_URL, POPULAR_PATH, SEARCH_PATH } from "../constants/constant";

type MovieResponse = { results: Movie[]; total_pages: number };

async function fetchApi(path: string, page: number, query: string = ""): Promise<MovieResponse> {
  const queryString = query ? `&query=${encodeURIComponent(query)}` : "";
  const response = await fetch(
    `${BASE_URL}/${path}?api_key=${API_KEY}${queryString}&language=ko-KR&page=${page}`,
  );
  if (!response.ok) throw new Error(`API 요청 실패: ${response.status}`);
  return response.json();
}

export async function getPopularMovies(page: number): Promise<MovieResponse> {
  try {
    return await fetchApi(POPULAR_PATH, page);
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}

export async function getSearchMovies(page: number, searchQuery: string): Promise<MovieResponse> {
  try {
    return await fetchApi(SEARCH_PATH, page, searchQuery);
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}

export async function getMoreMovies(page: number, searchQuery: string): Promise<MovieResponse> {
  try {
    return searchQuery
      ? await fetchApi(SEARCH_PATH, page, searchQuery)
      : await fetchApi(POPULAR_PATH, page);
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}
