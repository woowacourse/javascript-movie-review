export type MovieStore = {
  get(key: string): Promise<string | null>;
  save(key: string, value: string): Promise<void>;
};
export default class LocalStorage {
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
