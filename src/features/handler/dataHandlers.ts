import { fetchMoviesApi } from "../api/fetchMoviesApi";
import MovieList from "../UI/MovieList";
import { POPULAR_PATH, SEARCH_PATH } from "../../constants/constant";
import { Movie } from "../../../types/types";

const movieListInstance = new MovieList();

async function fetchApi(
  page: number,
  searchMovie?: string,
): Promise<{ results: Movie[]; total_pages: number }> {
  if (searchMovie) {
    return await fetchMoviesApi(SEARCH_PATH, page, searchMovie);
  }

  return await fetchMoviesApi(POPULAR_PATH, page, searchMovie);
}

export async function handleMoreMovie(
  page: number,
  searchMovie: string,
): Promise<{
  results: Movie[];
  total_pages: number;
}> {
  try {
    const data: { results: Movie[]; total_pages: number } = await fetchApi(
      page,
      searchMovie,
    );
    return data;
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}

export async function handleMovie(page: number): Promise<{
  results: Movie[];
  total_pages: number;
}> {
  try {
    movieListInstance.renderSkeleton();
    const data: { results: Movie[]; total_pages: number } = await fetchApi(
      page,
    );
    return data;
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}

export async function handleSearchMovie(
  page: number,
  searchMovie: string,
): Promise<{
  results: Movie[];
  total_pages: number;
}> {
  try {
    movieListInstance.renderSkeleton();
    const data: { results: Movie[]; total_pages: number } = await fetchApi(
      page,
      searchMovie,
    );
    return data;
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}
