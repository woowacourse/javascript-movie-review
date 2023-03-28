import { MovieResponse } from './remotes/movies';

export interface Movie {
  id: MovieResponse['id'];
  title: MovieResponse['title'];
  posterPath: MovieResponse['poster_path'];
  voteAverage: MovieResponse['vote_average'];
}

interface MovieService {
  movies: Movie[];
  resultsToMovies: (results: MovieResponse[]) => Movie[];
}

const movieService: MovieService = {
  movies: [],

  resultsToMovies(results) {
    return results.map(({ id, title, poster_path, vote_average }) => ({
      id,
      title,
      posterPath: poster_path,
      voteAverage: vote_average,
    }));
  },
};

export default movieService;
