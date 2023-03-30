const storage = {
  setLocalStorage(key: string, data: Parameters<JSON['stringify']>[0]) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  getLocalStorage<T>(key: string) {
    const data = localStorage.getItem(key);
    if (!data) return;

    const parsedData: T = JSON.parse(data);

    return parsedData;
  },
};

export default storage;
