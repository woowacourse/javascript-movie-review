import { MoviesResponse } from "../../types/movieApiType";
import { TMDB_BASE_URL } from "../constants/constants";

async function fetchWithErrorHandling(url: string): Promise<MoviesResponse> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  return fetch(url, options).then((res) => {
    if (res.ok) return res.json();
    throw new Error(String(res.status));
  });
}

export async function getMovies({ page }: { page: number }) {
  const params = new URLSearchParams({
    language: "ko-KR",
    page: String(page),
  });

  const url = `${TMDB_BASE_URL}/movie/popular?${params.toString()}`;
  return fetchWithErrorHandling(url);
}

export async function getMovieByName({
  name,
  page,
}: {
  name: string;
  page: number;
}) {
  const params = new URLSearchParams({
    query: name,
    include_adult: "false",
    language: "ko-KR",
    page: String(page),
  });

  const url = `${TMDB_BASE_URL}/search/movie?${params.toString()}`;
  return fetchWithErrorHandling(url);
}
