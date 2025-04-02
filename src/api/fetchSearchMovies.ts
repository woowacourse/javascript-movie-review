import { TMDB_PaginatedMovies } from "../../types/TMDB_data";
import ErrorMessage from "../constants/ErrorMessage";
import ApiClient from "./ApiClient";

async function fetchSearchMovies(query: string, pageNumber: number) {
  const params = new URLSearchParams({
    page: pageNumber.toString(),
    query: query,
    language: "ko-KR",
    region: "KR",
  });

  try {
    const TMDB_movieList = await ApiClient.get<TMDB_PaginatedMovies>(
      "/search/movie?" + params.toString()
    );
    const movies = TMDB_movieList.results.map(
      ({ id, backdrop_path, poster_path, vote_average, title }) => {
        return {
          id,
          backdropPath: backdrop_path,
          posterPath: poster_path,
          rate: vote_average,
          title,
        };
      }
    );
    return { movies: movies, canMore: TMDB_movieList.total_pages > pageNumber };
  } catch (error) {
    if (error instanceof Error)
      throw new Error(ErrorMessage.FETCH_SEARCH_MOVIES || error.message);
  }
}

export default fetchSearchMovies;
