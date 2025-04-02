const storage = {
  localStorage: window.localStorage,

  getData(key: string) {
    return this.localStorage.getItem(key);
  },

  setData(key: string, data: string) {
    this.localStorage.setItem(key, data);
  },

  removeData(key: string) {
    this.localStorage.removeItem(key);
  },
};

export default storage;
