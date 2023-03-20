import Storage from '../type/Storage';

const LocalStorage: Storage = {
  setItem(key, value) {
    window.localStorage.setItem(key, value);
  },

  getItem(key) {
    return window.localStorage.getItem(key) ?? '';
  },
};

export default LocalStorage;
