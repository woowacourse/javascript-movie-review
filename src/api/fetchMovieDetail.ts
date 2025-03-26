import { MovieDetailProps } from "../../types/domain";
import { TMDB_MovieDetail } from "../../types/TMDB_data";
import ErrorMessage from "../constants/ErrorMessage";
import ApiClient from "./ApiClient";

async function fetchMovieDetail(id: string) {
  const params = new URLSearchParams({
    language: "ko-KR",
  });

  try {
    const TMDB_movieDetail = await ApiClient.get<TMDB_MovieDetail>(
      `/movie/${id}?` + params.toString()
    );
    const movieDetail: MovieDetailProps = {
      posterPath: TMDB_movieDetail.poster_path,
      title: TMDB_movieDetail.title,
      releaseYear: TMDB_movieDetail.release_date.split("-")[0],
      category: TMDB_movieDetail.genres.map((genre) => genre.name),
      rate: TMDB_movieDetail.vote_average,
      detail: TMDB_movieDetail.overview,
    };

    return movieDetail;
  } catch (error) {
    if (error instanceof Error)
      throw new Error(ErrorMessage.FETCH_MOVIE_DETAIL || error.message);
  }
}

export default fetchMovieDetail;
