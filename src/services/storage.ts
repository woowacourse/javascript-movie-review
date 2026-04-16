export interface Storage {
  get(key: string): string | null;
  set(key: string, value: string): void;
}

export const localStorageRepository: Storage = {
  get(key) {
    return window.localStorage.getItem(key);
  },
  set(key, value) {
    window.localStorage.setItem(key, value);
  },
};
