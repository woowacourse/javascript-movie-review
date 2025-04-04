export const LOCAL_STORAGE_KEYS = {
  RATING: 'rating'
} as const;

type LocalStorageKey = (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];

export function getLocalStorage<T>(key: LocalStorageKey, defaultValue: T): T {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
}

export function setLocalStorage<T>(key: LocalStorageKey, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeItemById<T extends { id: number }>(key: LocalStorageKey, id: number) {
  const storedData = getLocalStorage<T[]>(key, []);
  if (!Array.isArray(storedData)) {
    return;
  }
  const updatedData = storedData.filter((item) => item.id !== id);
  setLocalStorage(key, updatedData);
}
