import { fetchPopularMovies, fetchSearchMovies } from "../api/fetchMoviesApi";
import { Movie } from "../../../types/types";

export async function getMoreMovies(page: number, searchQuery: string) {
  try {
    const data: { results: Movie[]; total_pages: number } = searchQuery
      ? await fetchSearchMovies(page, searchQuery)
      : await fetchPopularMovies(page);
    return data;
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}

export async function getPopularMovies(page: number): Promise<{
  results: Movie[];
  total_pages: number;
}> {
  try {
    const data: { results: Movie[]; total_pages: number } =
      await fetchPopularMovies(page);
    return data;
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}

export async function getSearchMovies(
  page: number,
  searchQuery: string,
): Promise<{
  results: Movie[];
  total_pages: number;
}> {
  try {
    const data: { results: Movie[]; total_pages: number } =
      await fetchSearchMovies(page, searchQuery);
    return data;
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}
