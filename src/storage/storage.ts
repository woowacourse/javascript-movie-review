import { UserMovieRateData } from "../../types/data";

interface IStorage {
  localStorage: Storage;
  getData: (key: string) => UserMovieRateData[];
  setData: (key: string, data: UserMovieRateData[]) => void;
}

const storage: IStorage = {
  localStorage: window.localStorage,

  getData(key) {
    const data = this.localStorage.getItem(key) ?? "[]";
    return JSON.parse(data);
  },

  setData(key, data) {
    const stringifyData = JSON.stringify(data);
    this.localStorage.setItem(key, stringifyData);
  },
};

export default storage;
