import { MoviesResponse } from "../../types/movieApiType";
import { DOMAIN_TMDB } from "../constants";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};

async function fetchWithErrorHandling(url: string) {
  return fetch(url, options).then((res) => {
    if (res.ok) return res.json() as unknown as MoviesResponse;
    throw new Error(String(res.status));
  });
}

export async function getMovies({ page }: { page: number }) {
  const url = `${DOMAIN_TMDB}/3/movie/popular?language=ko-KR&page=${page}`;
  return fetchWithErrorHandling(url);
}

interface GetMovieByNameRequest {
  name: string;
  page: number;
}

export async function getMovieByName({ name, page }: GetMovieByNameRequest) {
  const url = `${DOMAIN_TMDB}/3/search/movie?query=${name}&include_adult=false&language=ko-KR&page=${page}`;
  return fetchWithErrorHandling(url);
}
