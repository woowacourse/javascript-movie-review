import { LocalStorage } from "./Storage";

interface RateStarData {
  movieId: number;
  rate: number;
}

export default class RateStarLocalStorage {
  private static readonly RATE_STAR_KEY = "rateStar";
  private storage: LocalStorage = new LocalStorage();

  getRateStar(): RateStarData[] {
    return this.storage.get(RateStarLocalStorage.RATE_STAR_KEY) ?? [];
  }

  setRateStar(value: RateStarData) {
    this.storage.set(RateStarLocalStorage.RATE_STAR_KEY, value);
  }

  removeRateStar() {
    this.storage.remove(RateStarLocalStorage.RATE_STAR_KEY);
  }
}
