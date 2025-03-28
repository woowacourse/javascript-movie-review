import fetchJson from "./utils/fetchJson";
import MovieType from "../types/MovieType";

interface DetailMoviesResponse {
  results: MovieType[];
}

export default async function fetchDetailsMovie(id: number) {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_THDB_API_KEY}`,
    },
  };

  const results = await fetchJson<DetailMoviesResponse>(url, options);
  return results;
}
