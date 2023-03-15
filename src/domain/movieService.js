const movieService = {
  movies: [],

  concatMovies(newMovies) {
    this.movies = [...this.movies, ...newMovies];
  },

  resetMovies() {
    this.movies = [];
  },
};

export default movieService;
