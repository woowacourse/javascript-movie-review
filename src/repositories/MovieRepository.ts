import { MovieStore } from '../storage/LocalStorage';
export default class MovieRepository {
  #db: MovieStore;
  constructor(db: MovieStore) {
    this.#db = db;
  }

  async saveRate(key: string, value: string): Promise<void> {
    return this.#db.save(key, value);
  }

  async getRate(key: string): Promise<string | null> {
    return this.#db.get(key);
  }
}
