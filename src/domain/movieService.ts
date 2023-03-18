import { MovieResponse } from '../api';

interface Movie {
  title: MovieResponse['title'];
  posterPath: MovieResponse['poster_path'];
  voteAverage: MovieResponse['vote_average'];
}

interface MovieService {
  movies: Movie[];
  resultsToMovies: (results: MovieResponse[]) => Movie[];
  concatMovies: (newMovies: Movie[]) => void;
  resetMovies: () => void;
}

const movieService: MovieService = {
  movies: [],

  resultsToMovies(results) {
    return results.map(({ title, poster_path, vote_average }) => ({
      title,
      posterPath: poster_path,
      voteAverage: vote_average,
    }));
  },

  concatMovies(newMovies: Movie[]) {
    this.movies = [...this.movies, ...newMovies];
  },

  resetMovies() {
    this.movies = [];
  },
};

export default movieService;
