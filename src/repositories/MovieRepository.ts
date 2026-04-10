import { MovieStore } from '../storage/LocalStorage';
export default class MovieRepository {
  #db: MovieStore;
  constructor(db: MovieStore) {
    this.#db = db;
  }

  saveRate(key: string, value: string) {
    return this.#db.save(key, value);
  }

  getRate(key: string) {
    return this.#db.get(key);
  }
}
