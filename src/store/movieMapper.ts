import { Movie } from "../../types/movie.ts";

export const mapToMovie = (apiData: any): Movie => ({
  id: apiData.id,
  title: apiData.title,
  rating: Number(apiData.vote_average.toFixed(1)),
  imageSrc: apiData.poster_path,
  description: apiData.overview,
  releaseDate: apiData.release_date,
  genres: apiData.genres || [],
});
