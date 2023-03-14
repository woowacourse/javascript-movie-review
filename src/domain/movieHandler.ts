import type { Movie } from "./../types/type";

interface MovieHandler {
  movies: Movie[];
  currentPageNumber: number;
  addMovies(movies: Movie[]): void;
  sortByPopularity(movies: Movie[]): Movie[];
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
};

export default movieHandler;
