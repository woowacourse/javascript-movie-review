import { MovieAPIReturnType, MovieItemReturnType } from '../../api/movieAPI.type';
import type { Movie } from '../../types/movie';

class MovieDomain {
  movie;

  constructor(movieList: MovieItemReturnType) {
    this.movie = movieList;
  }

  formatMovieList(): Movie {
    const formattedMovie = {
      id: this.movie.id,
      title: this.movie.title,
      posterPath: this.movie.poster_path,
      voteAverage: Number(this.movie.vote_average?.toFixed(1)),
    };
    // const formattedMovieList = this.movie.results.map(movie => ({
    //   id: movie.id,
    //   title: movie.title,
    //   posterPath: movie.poster_path,
    //   voteAverage: Number(movie.vote_average?.toFixed(1)),
    // }));

    return formattedMovie;
  }
}

export default MovieDomain;
