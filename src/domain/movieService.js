const movieService = {
  movies: [],

  concatMovies(newMovies) {
    this.movies = [...this.movies, ...newMovies];
  },

  resetMovies() {
    this.movies = [];
  },

  sortByPopularity(movies) {
    return [...movies].sort((a, b) => b.popularity - a.popularity);
  },
};

export default movieService;
