import { MoviesAPI } from '../../api/interfaces/MoviesAPI';
import { Movie, MovieDetail } from '../../domain/movie.type';
import { PromiseStateSubject } from '../PromiseStateSubject';

export class MovieDetailSubject extends PromiseStateSubject<MovieDetail, Movie> {
  constructor(private readonly api: MoviesAPI) {
    super();
  }

  async fetchMovieDetail(movie: Movie) {
    this.fetch(() => this.api.getMovie({ id: movie.id }), movie);
  }
}
