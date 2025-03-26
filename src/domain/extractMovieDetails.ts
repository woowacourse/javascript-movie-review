import { MovieDetailsData } from "../../types/data.ts";
import { MovieDetails } from "../../types/domain.ts";
import { IMAGE, VOTE } from "../constants/movie.ts";

function extractMovieDetails(movieDetailsData: MovieDetailsData): MovieDetails {
  const {
    genres,
    id,
    overview,
    poster_path,
    release_date,
    title,
    vote_average,
  } = movieDetailsData;

  const genreNames = genres.map(({ name }) => name);
  const posterPath = IMAGE.prefix + poster_path;
  const releaseYear = new Date(release_date).getFullYear();
  const voteAverage = Number(vote_average.toFixed(VOTE.rateDegit));

  return {
    genres: genreNames,
    id,
    overview,
    posterPath,
    releaseYear,
    title,
    voteAverage,
  };
}

export default extractMovieDetails;
