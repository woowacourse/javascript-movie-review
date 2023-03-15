import type { Movie } from "./../types/type";

interface MovieHandler {
  movies: Movie[];
  currentPageNumber: number;
  addMovies(movies: Movie[]): void;
  sortByPopularity(movies: Movie[]): Movie[];
  initializeMovies(): void;
}

const movieHandler: MovieHandler = {
  movies: [],
  currentPageNumber: 1,

  addMovies(movies) {
    this.movies = [...this.movies, ...this.sortByPopularity(movies)];
  },

  sortByPopularity(movies) {
    return movies.sort((a, b) => b.popularity - a.popularity);
  },

  initializeMovies() {
    this.movies = [];
  },
};

export default movieHandler;
