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
  get() {
    return this.movies;
  }

  remove(movie: IMovie) {
    this.movies = this.movies.filter(m => !new Movie(m).equal(movie));
  }

  update(movie: IMovie) {
    this.movies = this.movies.map(m => (new Movie(m).equal(movie) ? movie : m));
    if (!this.has(movie)) {
      this.add(movie);
    }
  }

  getScoresInfo() {
    return this.movies.map(movie => new Movie(movie).getScoreInfo());
  }

  has(movie: IMovie) {
    return this.movies.some(m => new Movie(m).equal(movie));
  }

  getFiltered(movie: IMovie) {
    return this.movies.filter(m => new Movie(m).equal(movie));
  }
}
export default MovieCollection;
