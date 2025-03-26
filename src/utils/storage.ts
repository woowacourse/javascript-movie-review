export const SessionStorage = {
  getItems<T>(storageKey: string): T[] {
    const storedData = sessionStorage.getItem(storageKey);
    return storedData ? JSON.parse(storedData) : [];
  },

  saveItems<T>(items: T[], storageKey: string): void {
    sessionStorage.setItem(storageKey, JSON.stringify(items));
  },
};
