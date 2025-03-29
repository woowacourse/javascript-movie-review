class LocalStorage {
  static get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  static set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }
}

export default LocalStorage;
