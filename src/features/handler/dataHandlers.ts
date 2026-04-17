import { fetchApi, fetchMovieDetailApi } from "../api/fetchApi";
import { POPULAR_PATH, SEARCH_PATH } from "../../constants/path";
import { MovieDetail, MovieResponse } from "../../../types/types";

async function fetchMovieList(
  page: number,
  query?: string,
): Promise<MovieResponse> {
  if (query) {
    return await fetchApi(SEARCH_PATH, page, query);
  }
  return await fetchApi(POPULAR_PATH, page);
}

export async function getPopularMovies(page: number): Promise<MovieResponse> {
  return await fetchMovieList(page);
}

export async function getSearchMovies(
  page: number,
  query: string,
): Promise<MovieResponse> {
  return await fetchMovieList(page, query);
}

export async function getMoreMovies(
  page: number,
  query: string,
): Promise<MovieResponse> {
  return await fetchMovieList(page, query);
}

export async function getMovieDetail(movieId: number): Promise<MovieDetail> {
  return await fetchMovieDetailApi(movieId);
}
