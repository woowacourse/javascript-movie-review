import LocalStorage from "./LocalStorage";

const LOCALSTORAGE_KEY = "movie-review-app";

type RateMap = {
  [id: string]: number;
};

type StorageData = {
  rates: RateMap;
};

class RateStorage {
  static init() {
    const data = LocalStorage.get<StorageData>(LOCALSTORAGE_KEY);
    if (!data) {
      LocalStorage.set<StorageData>(LOCALSTORAGE_KEY, { rates: {} });
    }
  }

  static saveRate({ id, rate }: { id: string; rate: number }) {
    const rates = this.#getAllRates();
    rates[id] = rate;
    LocalStorage.set<StorageData>(LOCALSTORAGE_KEY, { rates });
  }

  static #getAllRates(): RateMap {
    const data = LocalStorage.get<StorageData>(LOCALSTORAGE_KEY);
    return data?.rates ?? {};
  }

  static getRate(id: string) {
    const rates = this.#getAllRates();
    return rates[id];
  }
}

export default RateStorage;
