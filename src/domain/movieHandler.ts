import type { Movie } from "./../types/type";

interface MovieHandler {
  movies: Movie[];
  addMovies(movies: Movie[]): void;
  initializeMovies(): void;
}

const movieHandler: MovieHandler = {
  movies: [],

  addMovies(movies) {
    this.movies = [...movies];
  },

  initializeMovies() {
    this.movies = [];
  },
};

export default movieHandler;
