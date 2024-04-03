import { IMovie } from '../types/movie';
import Movie from './Movie';

class MovieStorageService {
  private readonly KEY: string;
  private readonly storage: Storage;

  constructor(storage: Storage = localStorage, key: string = 'movies') {
    this.storage = storage;
    this.KEY = key;
  }

  removeAll() {
    this.storage.removeItem(this.KEY);
  }
  load(): IMovie[] {
    const movies = this.storage.getItem(this.KEY);
    return movies ? JSON.parse(movies) : [];
  }
  save(movies: IMovie[]) {
    this.storage.setItem(this.KEY, JSON.stringify(movies));
  }

  update(movie: IMovie) {
    const movies = this.load();
    const updatedMovies = movies.map(m => (new Movie(m).equal(movie) ? movie : m));
    this.save(updatedMovies);
  }
}

export default MovieStorageService;
