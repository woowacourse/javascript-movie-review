import LocalStorage from "./LocalStorage";

const LOCALSTORAGE_KEY = "movie-review-app";
class RateStorage {
  static init() {
    if (!LocalStorage.get(LOCALSTORAGE_KEY)) {
      LocalStorage.set(LOCALSTORAGE_KEY, { rates: {} });
    }
  }

  static saveRate({ id, rate }) {
    const rates = this.getAllRates();
    rates[id] = rate;
    LocalStorage.set(LOCALSTORAGE_KEY, { rates });
  }

  static getAllRates() {
    const data = LocalStorage.get(LOCALSTORAGE_KEY);
    return data["rates"];
  }

  static getRate(id) {
    const rates = this.getAllRates();
    return rates[id];
  }
}

export default RateStorage;
