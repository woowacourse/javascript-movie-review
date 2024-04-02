const Storage = {
  setItem<T>(key: string, value: T[]) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getItem<T>(key: string): T[] {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  },
};

export default Storage;
