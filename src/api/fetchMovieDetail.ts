import { MovieDetailProps } from "../../types/domain";
import { TMDB_MovieDetail } from "../../types/TMDB_data";
import ErrorMessage from "../constants/ErrorMessage";
import ApiClient from "./ApiClient";

async function fetchMovieDetail(id: string) {
  const params = new URLSearchParams({
    language: "ko-KR",
  });

  try {
    const TMDBMovieDetail = await ApiClient.get<TMDB_MovieDetail>(
      `/movie/${id}?` + params.toString()
    );
    const movieDetail: MovieDetailProps = {
      id: TMDBMovieDetail.id,
      posterPath: TMDBMovieDetail.poster_path,
      title: TMDBMovieDetail.title,
      releaseYear: TMDBMovieDetail.release_date.split("-")[0],
      category: TMDBMovieDetail.genres.map((genre) => genre.name),
      rate: TMDBMovieDetail.vote_average,
      detail: TMDBMovieDetail.overview,
    };

    return movieDetail;
  } catch (error) {
    if (error instanceof Error)
      throw new Error(ErrorMessage.FETCH_MOVIE_DETAIL || error.message);
  }
}

export default fetchMovieDetail;
