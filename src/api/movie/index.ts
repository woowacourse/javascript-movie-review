import { MoviesResponse } from "../../../types/movie";
import { fetchWithErrorHandling } from "../client";
import { createMovieApiUrl, MOVIE_API } from "../endpoints";

interface MovieApiProps {
  page: number;
  name: string;
}

export async function getMovies({ page }: Omit<MovieApiProps, "name">) {
  const url = createMovieApiUrl(MOVIE_API.endPoints.movies.popular, {
    language: "ko-KR",
    page: String(page),
  });

  return fetchWithErrorHandling<MoviesResponse>(url);
}

export async function searchMovies({ name, page }: MovieApiProps) {
  const url = createMovieApiUrl(MOVIE_API.endPoints.movies.search, {
    query: String(name),
    include_adult: "false",
    language: "ko-KR",
    page: String(page),
  });

  return fetchWithErrorHandling<MoviesResponse>(url);
}
