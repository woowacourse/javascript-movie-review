import { MovieAPIReturnType } from '../../api/movieAPI.type';
import type { Movie } from '../../types/movie';

class MovieDomain {
  moveList;

  constructor(movieList: MovieAPIReturnType) {
    this.moveList = movieList;
  }

  formatMovieList(): Movie[] {
    const formattedMovieList = this.moveList.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      voteAverage: movie.vote_average,
    }));

    return formattedMovieList;
  }
}

export default MovieDomain;
