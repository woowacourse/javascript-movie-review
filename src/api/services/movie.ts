import { fetchWithErrorHandling } from "../config/client";
import { GetMoviesRequest, SearchMoviesRequest } from "../types/movie/request";
import { MoviesResponse } from "../types/movie/response";
import { createMovieApiUrl, MOVIE_API } from "./../config/endpoints/movie";

export async function getMovies({ page }: GetMoviesRequest) {
  const url = createMovieApiUrl(MOVIE_API.endPoints.movies.popular, {
    language: "ko-KR",
    page: String(page),
  });

  return fetchWithErrorHandling<MoviesResponse>(url);
}

export async function searchMovies({ page, title }: SearchMoviesRequest) {
  const url = createMovieApiUrl(MOVIE_API.endPoints.movies.search, {
    query: String(title),
    include_adult: "false",
    language: "ko-KR",
    page: String(page),
  });

  return fetchWithErrorHandling<MoviesResponse>(url);
}
