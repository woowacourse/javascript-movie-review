export const LOCAL_STORAGE_KEYS = {
  RATING: 'rating'
} as const;

type LocalStorageKey = (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];

export function getLocalStorage<T>(key: LocalStorageKey, defaultValue: T): T {
  const storedData = localStorage.getItem(key);

  if (!storedData) return defaultValue;

  try {
    return JSON.parse(storedData) as T;
  } catch (error) {
    console.warn(`[getLocalStorage] ${key}의 파싱에 실패했습니다. 기본값을 반환합니다.`);
    return defaultValue;
  }
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
