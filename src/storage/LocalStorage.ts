import { MovieStore } from './types';
export default class LocalStorage implements MovieStore {
  #myStorage;

  constructor() {
    this.#myStorage = window.localStorage;
  }

  async save(key: number, value: number): Promise<void> {
    this.#myStorage.setItem(String(key), String(value));
  }

  async get(key: number): Promise<string | null> {
    return this.#myStorage.getItem(String(key));
  }
}
