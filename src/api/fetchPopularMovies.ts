import { TMDB_PaginatedMovies } from "../../types/TMDB_data";
import ErrorMessage from "../constants/ErrorMessage";
import ApiClient from "./ApiClient";

async function fetchPopularMovies(pageNumber: number) {
  const params = new URLSearchParams({
    page: pageNumber.toString(),
    language: "ko-KR",
    region: "KR",
  });

  try {
    const TMDB_movieList = await ApiClient.get<TMDB_PaginatedMovies>(
      "/movie/popular?" + params.toString()
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
    return movies;
  } catch (error) {
    if (error instanceof Error)
      throw new Error(ErrorMessage.FETCH_POPULAR_MOVIES || error.message);
  }
}

export default fetchPopularMovies;
