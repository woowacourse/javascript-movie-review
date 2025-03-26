import { Movie } from "../../types/movie";

interface ApiMovie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string | null;
}

export const mapToMovie = (apiData: ApiMovie): Movie => ({
  id: apiData.id,
  title: apiData.title,
  voteAverage: apiData.vote_average,
  posterPath: apiData.poster_path,
});
