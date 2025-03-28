import safeFetchJson from "./utils/safeFetchJson";
import MovieType from "../types/MovieType";

interface SearchMoviesResponse {
  results: MovieType[];
  total_pages: number;
}

export default async function fetchSearchMovies(query: string, page: number) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    query
  )}&include_adult=false&language=ko-KR&page=${page}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_THDB_API_KEY}`,
    },
  };

  const { results, total_pages } = await safeFetchJson<SearchMoviesResponse>(
    url,
    options
  );
  return { results, totalPages: total_pages };
}
