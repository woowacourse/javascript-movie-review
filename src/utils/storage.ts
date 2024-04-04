import { LOCAL_STORAGE_KEY } from '../consts/userRating';

const storage = {
  get<T>(): T {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  },

  set<T>(object: T) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(object));
  },
};

export default storage;
