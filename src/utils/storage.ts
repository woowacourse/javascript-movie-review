const storage = {
  get<T>(key: string): T {
    const item = localStorage.getItem(key);
    if (item === null) {
      return [] as T;
    }

    return JSON.parse(item);
  },

  set<T>(key: string, value: T) {
    const item = JSON.stringify(value);
    localStorage.setItem(key, item);
  },
};

export default storage;
