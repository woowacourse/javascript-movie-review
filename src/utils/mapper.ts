import { Movie } from "../../types/movie";

export const mapToMovie = (apiData: any): Movie => ({
  id: apiData.id,
  title: apiData.title,
  voteAverage: Number(apiData.vote_average.toFixed(1)),
  posterPath: apiData.poster_path,
});
