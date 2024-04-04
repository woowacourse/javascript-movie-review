const storage = {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }

      return JSON.parse(item);
    } catch (err) {
      localStorage.clear();
      return null;
    }
  },

  set(key: string, value: unknown) {
    const item = JSON.stringify(value);
    localStorage.setItem(key, item);
  },
};

export default storage;
