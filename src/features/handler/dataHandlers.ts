import { fetchMoviesApi } from "../api/fetchMoviesApi";
import { POPULAR_PATH, SEARCH_PATH } from "../../constants/path";
import { MovieResponse } from "../../../types/types";

async function fetchApi(
  page: number,
  searchMovie?: string,
): Promise<MovieResponse> {
  if (searchMovie) {
    return await fetchMoviesApi(SEARCH_PATH, page, searchMovie);
  }

  return await fetchMoviesApi(POPULAR_PATH, page, searchMovie);
}

export async function handleMoreMovie(
  page: number,
  searchMovie: string,
): Promise<MovieResponse> {
  try {
    return await fetchApi(page, searchMovie);
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}

export async function handleMovie(page: number): Promise<MovieResponse> {
  try {
    return await fetchApi(page);
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}

export async function handleSearchMovie(
  page: number,
  searchMovie: string,
): Promise<MovieResponse> {
  try {
    return await fetchApi(page, searchMovie);
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}
