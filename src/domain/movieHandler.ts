import type { Movie } from "./../types/type";

interface MovieHandler {
  movies: Movie[];
  addMovies(movies: Movie[]): void;
  getSelectedMovie(id: number): Movie;
  initializeMovies(): void;
}

const movieHandler: MovieHandler = {
  movies: [],

  addMovies(movies) {
    this.movies = [...this.movies, ...movies];
  },

  getSelectedMovie(id: number): Movie {
    return <Movie>this.movies.find((movie) => movie.id === Number(id));
  },

  initializeMovies() {
    this.movies = [];
  },
};

export default movieHandler;
