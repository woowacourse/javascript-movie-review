import type { TMDBResponseResult } from '../types/tmdb';
import type { Movie } from '../types/domain';

interface MovieService {
  movies: Movie[];
  resultsToMovies: (results: TMDBResponseResult[]) => Movie[];
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
