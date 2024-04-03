export default class Store {
  private store: Storage;

  constructor(storage: Storage = localStorage) {
    this.store = storage;
  }

  get(key: string): any {
    try {
      const rawData = this.store.getItem(key);
      return rawData ? JSON.parse(rawData) : null;
    } catch {
      this.store.removeItem(key);
      return null;
    }
  }

  set(key: string, value: any): void {
    const stringifiedValue = value ? JSON.stringify(value) : "";

    this.store.setItem(key, stringifiedValue);
  }

  remove(key: string): void {
    this.store.removeItem(key);
  }
}
