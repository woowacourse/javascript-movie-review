import { Rate } from "../type/rate";

const LocalStorageService = {
  getData(itemName: string) {
    const item = localStorage.getItem(itemName);

    if (item) {
      return JSON.parse(item);
    }
    return [];
  },

  setData(itemName: string, item: Rate[]) {
    localStorage.setItem(itemName, JSON.stringify(item));
  },
};

export default LocalStorageService;
