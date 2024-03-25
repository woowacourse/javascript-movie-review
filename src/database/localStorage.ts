const storage = {
  get<T>(key: string, matcher: (item: T) => boolean): T | undefined {
    const localStorageData = localStorage.getItem(key);
    if (localStorageData === null) return undefined;

    const list = JSON.parse(localStorageData) as T[];
    return list.find(matcher);
  },

  set<T>(key: string, list: T[]) {
    localStorage.setItem(key, JSON.stringify(list));
  },

  add<T>(key: string, data: T) {
    const localStorageData = localStorage.getItem(key);
    if (localStorageData === null) {
      localStorage.setItem(key, JSON.stringify([data]));
      return;
    }
    const existingData: T[] = JSON.parse(localStorageData);
    const newData = [...existingData, data];
    localStorage.setItem(key, JSON.stringify(newData));
  },

  list<T>(key: string): T[] {
    const localStorageData = localStorage.getItem(key);
    if (localStorageData === null) return [];

    return JSON.parse(localStorageData);
  },
};

export default storage;
