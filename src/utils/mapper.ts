import { Movie } from "../../types/movie";

export const mapToMovie = (apiData: any): Movie => ({
  id: apiData.id,
  title: apiData.title,
  voteAverage: apiData.vote_average,
  posterPath: apiData.poster_path,
});
