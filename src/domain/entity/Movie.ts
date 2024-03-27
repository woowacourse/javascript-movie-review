import { MovieAPIReturnType, MovieItemReturnType } from '../../api/movieAPI.type';
import type { Movie } from '../../types/movie';

class MovieDomain {
  movie;

  constructor(movie: MovieItemReturnType) {
    this.movie = movie;
  }

  formatMovieList(): Movie {
    const formattedMovie = {
      id: this.movie.id,
      title: this.movie.title,
      posterPath: this.movie.poster_path,
      voteAverage: Number(this.movie.vote_average?.toFixed(1)),
    };

    return formattedMovie;
  }
}

export default MovieDomain;
