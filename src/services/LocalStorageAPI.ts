class LocalStorageAPI {
  static setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  static getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  static getAllItems(): { [key: string]: string } {
    return Object.fromEntries(
      Array.from({ length: localStorage.length })
        .map((_, i) => {
          const key = localStorage.key(i);
          return [key, localStorage.getItem(key!)];
        })
        .filter(([key, value]) => key !== null && value !== null)
    );
  }

  static clear(): void {
    localStorage.clear();
  }
}

export default LocalStorageAPI;
