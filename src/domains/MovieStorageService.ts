import { IMovie } from '../types/movie';
import Movie from './Movie';
import MovieCollection from './MovieCollection';

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
    const moviesSaving = movies.map(movie => ({ id: movie.id, score: movie.score }));
    this.storage.setItem(this.KEY, JSON.stringify(moviesSaving));
  }

  update(movie: IMovie) {
    const movies = this.load();
    const movieCollection = new MovieCollection(movies);
    movieCollection.update(movie);
    const updatedMovies = movieCollection.get();
    this.save(updatedMovies);
  }
}

export default MovieStorageService;
