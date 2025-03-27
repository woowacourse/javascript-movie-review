import { localStorageStore } from "../../../../storage";

const myRateStorage = {
  getRate(movieId: number): number {
    const key = `myRate-${movieId}`;
    const rate = localStorageStore.get<number>(key);
    return rate !== null ? rate : 0;
  },
  setRate(movieId: number, rate: number): void {
    const key = `myRate-${movieId}`;
    localStorageStore.set<number>(key, rate);
  },
};

export default myRateStorage;
