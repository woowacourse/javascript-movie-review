import { MovieDetail, MovieResponse } from "../../../types/types";
import { API_KEY, BASE_URL } from "../../constants/api";
import { ApiError, NotFoundError, UnauthorizedError } from "../../errors";

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 401) throw new UnauthorizedError();
    if (response.status === 404) throw new NotFoundError();
    throw new ApiError(response.status, `API 요청 실패: ${response.status}`);
  }
  return response.json();
}

export async function fetchApi(path: string, page: number, query: string = ""): Promise<MovieResponse> {
  const params = new URLSearchParams({
    api_key: API_KEY,
    language: "ko-KR",
    page: String(page),
    ...(query && { query }),
  });

  return request<MovieResponse>(`${BASE_URL}/${path}?${params}`);
}

export async function fetchMovieDetailApi(movieId: number): Promise<MovieDetail> {
  const params = new URLSearchParams({
    api_key: API_KEY,
    language: "ko-KR",
  });

  return request<MovieDetail>(`${BASE_URL}/movie/${movieId}?${params}`);
}
