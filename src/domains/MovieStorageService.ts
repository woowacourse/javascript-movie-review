import { IMovie } from '../types/movie';

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
  load() {
    const movies = this.storage.getItem(this.KEY);
    return movies ? JSON.parse(movies) : [];
  }
  save(movies: IMovie[]) {
    this.storage.setItem(this.KEY, JSON.stringify(movies));
  }
}

export default MovieStorageService;
