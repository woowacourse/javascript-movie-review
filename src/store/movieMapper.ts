import { Genre, Movie } from "../../types/movie.ts";

type ApiMovie = {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string | null;
  overview: string;
  release_date: string;
  genres: Genre[];
}

export const mapToMovie = (apiData: ApiMovie): Movie => ({
  id: apiData.id,
  title: apiData.title,
  rating: Number(apiData.vote_average.toFixed(1)),
  imageSrc: apiData.poster_path,
  description: apiData.overview,
  releaseDate: apiData.release_date,
  genres: apiData.genres || [],
});
