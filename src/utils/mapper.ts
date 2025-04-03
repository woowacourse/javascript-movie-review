import { Movie, MovieDetail, Genres } from "../../types/movie";

interface ApiMovie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string | null;
  genres: Genres[];
  overview: string;
}

export const mapToMovie = (apiData: ApiMovie): Movie | MovieDetail => ({
  id: apiData.id,
  title: apiData.title,
  voteAverage: apiData.vote_average,
  posterPath: apiData.poster_path,
  genres: apiData.genres,
  overview: apiData.overview,
});
