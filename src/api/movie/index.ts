import { MoviesResponse } from "../../../types/movie";
import { fetchWithErrorHandling } from "../client";

interface MovieApiProps {
  page: number;
  name: string;
}

export async function getMovies({ page }: Omit<MovieApiProps, "name">) {
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`;
  return fetchWithErrorHandling<MoviesResponse>(url);
}

export async function getMovieByName({ name, page }: MovieApiProps) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=ko-KR&page=${page}`;
  return fetchWithErrorHandling<MoviesResponse>(url);
}
