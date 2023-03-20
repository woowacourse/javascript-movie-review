import { MovieResponse } from '../api';

interface Movie {
  title: MovieResponse['title'];
  posterPath: MovieResponse['poster_path'];
  voteAverage: MovieResponse['vote_average'];
}

interface MovieService {
  movies: Movie[];
  resultsToMovies: (results: MovieData[]) => Movie[];
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
};

export default movieService;
