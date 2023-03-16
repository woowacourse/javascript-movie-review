import { updateMovies } from "../components/movieListHandler";
import { IMovie } from "../type";

export const movieStore = {
  movies: [] as IMovie[],

  appendMovies(newMovies: IMovie[]) {
    this.movies = [...this.movies, ...newMovies];

    updateMovies();
  },
};
