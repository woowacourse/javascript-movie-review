class LocalStorage {
  #myStorage;

  constructor() {
    this.#myStorage = window.localStorage;
  }

  saveRate(key: string, value: string) {
    this.#myStorage.setItem(key, value);
  }

  getRate(key: string) {
    return this.#myStorage.getItem(key);
  }
}

const localStorage = new LocalStorage();
export default localStorage;
