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
      voteAverage: Number(movie.vote_average?.toFixed(1)),
    }));

    return formattedMovieList;
  }
}

export default MovieDomain;
