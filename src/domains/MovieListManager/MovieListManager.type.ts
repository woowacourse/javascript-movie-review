import { MovieItem } from "../../types/movies";

export interface MovieListManagerInterface {
  isEndPage: () => boolean;
  fetchMovieList: () => Promise<MovieItem[] | undefined>;
}
