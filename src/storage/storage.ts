type StorageData = Record<string, string>;

const storage = {
  localStorage: window.localStorage,

  getData<K extends keyof StorageData>(key: K): StorageData[K] | null {
    return this.localStorage.getItem(key);
  },

  setData<K extends keyof StorageData>(key: K, data: StorageData[K]) {
    this.localStorage.setItem(key, data);
  },

  removeData<K extends keyof StorageData>(key: K) {
    this.localStorage.removeItem(key);
  },
};

export default storage;
