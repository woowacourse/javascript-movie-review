import { TMDB_PaginatedMovies } from "../../types/TMDB_data";
import ErrorMessage from "../constants/ErrorMessage";
import ApiClient from "./ApiClient";

async function fetchPopularMovies() {
  const params = new URLSearchParams({
    page: "1",
    language: "ko-KR",
  });

  try {
    const movies = await ApiClient.get<TMDB_PaginatedMovies>(
      "/movie/popular?" + params.toString()
    );
    return movies;
  } catch (error) {
    if (error instanceof Error)
      throw new Error(ErrorMessage.FETCH_POPULAR_MOVIES || error.message);
  }
}

export default fetchPopularMovies;
