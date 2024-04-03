const storage = {
  get<T>(key: string): T {
    const item = localStorage.getItem(key);
    if (item === null) {
      return [] as T;
    }

    return JSON.parse(item);
  },

  set(key: string, value: unknown) {
    const item = JSON.stringify(value);
    localStorage.setItem(key, item);
  },
};

export default storage;
