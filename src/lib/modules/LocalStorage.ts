import { LocalStorageKeyType } from '../types';

export default class LocalStorage {
  static get<TLocalStorageValue>(key: LocalStorageKeyType) {
    return JSON.parse(localStorage.getItem(key) ?? '') as TLocalStorageValue;
  }

  static set(key: LocalStorageKeyType, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key: LocalStorageKeyType) {
    localStorage.removeItem(key);
  }
}
