import fetchJson from "./utils/fetchJson";
import MovieType from "../types/MovieType";

interface PopularMoviesResponse {
  results: MovieType[];
  total_pages: number;
}

export default async function fetchPopularMovies(page: number) {
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_THDB_API_KEY}`,
    },
  };

  const { results, total_pages } = await fetchJson<PopularMoviesResponse>(
    url,
    options
  );
  return { results, totalPages: total_pages };
}
