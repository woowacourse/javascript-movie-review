import { updateMovies } from "../components/movieListHandler";
import { Movie } from "../type";

export const movieStore = {
  movies: [] as Movie[],

  appendMovies(newMovies: Movie[]) {
    this.movies = [...this.movies, ...newMovies];

    updateMovies();
  },
};
