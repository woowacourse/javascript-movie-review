import { MovieStore } from './types';
export default class LocalStorage implements MovieStore {
  #myStorage;

  constructor() {
    this.#myStorage = window.localStorage;
  }

  async save(key: string, value: string): Promise<void> {
    this.#myStorage.setItem(key, value);
  }

  async get(key: string): Promise<string | null> {
    return this.#myStorage.getItem(key);
  }
}
