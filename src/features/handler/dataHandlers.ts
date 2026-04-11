import { fetchApi, fetchMovieDetailApi } from "../api/fetchApi";
import { POPULAR_PATH, SEARCH_PATH } from "../../constants/path";
import { MovieDetail, MovieResponse } from "../../../types/types";

async function fetchMovieList(
  page: number,
  searchMovie?: string,
): Promise<MovieResponse> {
  if (searchMovie) {
    return await fetchApi(SEARCH_PATH, page, searchMovie);
  }
  return await fetchApi(POPULAR_PATH, page, searchMovie);
}

export async function readMoreMovies(
  page: number,
  searchMovie: string,
): Promise<MovieResponse> {
  return await fetchMovieList(page, searchMovie);
}

export async function readPopularMovies(page: number): Promise<MovieResponse> {
  return await fetchMovieList(page);
}

export async function readSearchMovies(
  page: number,
  searchMovie: string,
): Promise<MovieResponse> {
  return await fetchMovieList(page, searchMovie);
}

export async function readMovieDetail(movieId: number): Promise<MovieDetail> {
  return await fetchMovieDetailApi(movieId);
}
