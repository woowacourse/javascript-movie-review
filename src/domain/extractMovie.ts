import { MovieData } from "../../types/data.ts";
import { Movie } from "../../types/domain.ts";
import { IMAGE, VOTE } from "../constants/movie.ts";

function extractMovie(movieData: MovieData): Movie {
  const { id, backdrop_path, poster_path, title, vote_average } = movieData;

  const backdropPath = IMAGE.backdropPrefix + backdrop_path;
  const posterPath = IMAGE.prefix + poster_path;
  const voteAverage = Number(vote_average.toFixed(VOTE.rateDegit));

  return {
    id,
    backdropPath,
    posterPath,
    title,
    voteAverage,
  };
}

export default extractMovie;
