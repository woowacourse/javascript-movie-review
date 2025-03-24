import { LocalStorageKeyType } from '../types';

export default class LocalStorage {
  static get<TLocalStorageValue>(key: LocalStorageKeyType) {
    const value = localStorage.getItem(key);

    if (!value) return null;
    return JSON.parse(value) as TLocalStorageValue;
  }

  static set(key: LocalStorageKeyType, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key: LocalStorageKeyType) {
    localStorage.removeItem(key);
  }
}
