export type MovieStore = {
  get(key: string): void;
  save(key: string, value: string): void;
};
export default class LocalStorage {
  #myStorage;

  constructor() {
    this.#myStorage = window.localStorage;
  }

  save(key: string, value: string) {
    this.#myStorage.setItem(key, value);
  }

  get(key: string) {
    return this.#myStorage.getItem(key);
  }
}
