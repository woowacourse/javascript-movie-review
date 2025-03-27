import safeFetchJson from "./utils/safeFetchJson";
import MovieType from "../types/MovieType"; // 필요 시

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

  const { results, total_pages } = await safeFetchJson<PopularMoviesResponse>(
    url,
    options
  );
  return { results, totalPages: total_pages };
}
