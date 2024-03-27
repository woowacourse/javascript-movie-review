export interface BrowserStorageInterface<T> {
  get: () => T | undefined;
  set: (data: T) => void;
  remove: () => void;
}
