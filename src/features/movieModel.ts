import { Movie, MovieDetail } from "../../types/types";
import {
  API_KEY,
  BASE_URL,
  POPULAR_PATH,
  SEARCH_PATH,
} from "../constants/constant";

type MovieResponse = { results: Movie[]; total_pages: number };

async function fetchApi(
  path: string,
  page: number,
  query: string = "",
): Promise<MovieResponse> {
  const queryString = query ? `&query=${encodeURIComponent(query)}` : "";
  const response = await fetch(
    `${BASE_URL}/${path}?api_key=${API_KEY}${queryString}&language=ko-KR&page=${page}`,
  );
  if (!response.ok) throw new Error(`API 요청 실패: ${response.status}`);
  return response.json();
}

export async function getMovies(
  page: number,
  searchQuery: string = "",
): Promise<MovieResponse> {
  try {
    const path = searchQuery ? SEARCH_PATH : POPULAR_PATH;
    return await fetchApi(path, page, searchQuery);
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}

export async function getMovieDetail(id: number): Promise<MovieDetail> {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR`,
    );
    if (!response.ok) throw new Error(`API 요청 실패: ${response.status}`);
    return response.json();
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}
