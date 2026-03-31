import { Movie } from "../../types/types";

export async function fetchMovies(page: number) {
  const API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL: string = "https://api.themoviedb.org/3";

  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`,
  );
  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }
  const data: { results: Movie[] } = await response.json();

  return data;
}
