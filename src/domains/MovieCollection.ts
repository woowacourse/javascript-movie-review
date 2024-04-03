import { IMovie } from '../types/movie';
import Movie from './Movie';

class MovieCollection {
  private movies: IMovie[] = [];
  constructor(movies: IMovie[] = []) {
    this.movies = movies;
  }
  add(movie: IMovie) {
    this.movies.push(movie);
  }
  getMovies() {
    return this.movies;
  }

  remove(movie: IMovie) {
    this.movies = this.movies.filter(m => !new Movie(m).equal(movie));
  }
}
export default MovieCollection;
