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

export async function readMoreMovies(
  page: number,
  searchMovie: string,
): Promise<MovieResponse> {
  return await fetchApi(page, searchMovie);
}

export async function readPopularMovies(page: number): Promise<MovieResponse> {
  return await fetchApi(page);
}

export async function readSearchMovies(
  page: number,
  searchMovie: string,
): Promise<MovieResponse> {
  return await fetchApi(page, searchMovie);
}
