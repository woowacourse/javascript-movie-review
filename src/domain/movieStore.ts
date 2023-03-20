import { updateMovies } from "../components/movieListHandler";
import { Movie } from "../type";

export const movieStore = {
  movies: Array<Movie>(),

  appendMovies(newMovies: Array<Movie>) {
    this.movies = [...this.movies, ...newMovies];

    updateMovies();
  },
};
