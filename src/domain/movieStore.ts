import { updateMovies } from "../components/MovieList/movieListHandler";
import { Movie } from "../type";

export const movieStore = {
  movies: [] as Movie[],

  appendMovies(newMovies: Movie[]) {
    this.movies = [...this.movies, ...newMovies];

    updateMovies();
  },
};
