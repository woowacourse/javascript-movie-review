import LocalStorageService from "../service/localStorageService";
import { Rate } from "../type/rate";

class RateDataStateStore {
  #rateList: Rate[] | undefined;

  constructor() {
    this.#rateList = LocalStorageService.getData("rateList");
  }

  setRateList() {
    if (this.#rateList) LocalStorageService.setData("rateList", this.#rateList);
  }

  setNewRate(newRate: Rate) {
    const isExist = this.#rateList?.find(
      (rate) => rate.movieId === newRate.movieId,
    );

    if (isExist) {
      this.updateRateList(newRate);
      return;
    }
    this.addNewRate(newRate);
  }

  addNewRate(newRate: Rate) {
    this.#rateList?.push(newRate);
    this.setRateList();
  }

  updateRateList(newRate: Rate) {
    const rateIndex = this.#rateList?.findIndex(
      (rate) => rate.movieId === newRate.movieId,
    );

    if (rateIndex === undefined) return;
    if (this.#rateList) this.#rateList[rateIndex].rate = newRate.rate;
    this.setRateList();
  }

  getOneRate(movieId: number) {
    if (!this.#rateList) return undefined;
    return this.#rateList.find((rate) => rate.movieId === movieId);
  }
}

const rateDataStateStore = new RateDataStateStore();

export default rateDataStateStore;
