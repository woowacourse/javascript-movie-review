const movieService = {
  movies: [],

  resultsToMovies(results) {
    return results.map(({ title, poster_path, vote_average }) => ({
      title,
      posterPath: poster_path,
      voteAverage: vote_average,
    }));
  },

  concatMovies(movies) {
    this.movies = this.movies.concat(movies);
  },

  resetMovies() {
    this.movies = [];
  },
};

export default movieService;
