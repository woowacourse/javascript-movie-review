export enum LOCAL_STORAGE_KEYS {
  RATING = 'rating'
}

export function getLocalStorage<T>(key: LOCAL_STORAGE_KEYS, defaultValue: T): T {
  const storedData = localStorage.getItem(key);

  if (!storedData) return defaultValue;

  try {
    return JSON.parse(storedData) as T;
  } catch (error) {
    console.warn(`[getLocalStorage] ${key}의 파싱에 실패했습니다. 기본값을 반환합니다.`);
    return defaultValue;
  }
}

export function setLocalStorage<T>(key: LOCAL_STORAGE_KEYS, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeItemById<T extends { id: number }>(key: LOCAL_STORAGE_KEYS, id: number) {
  const storedData = getLocalStorage<T[]>(key, []);
  if (!Array.isArray(storedData)) {
    return;
  }
  const updatedData = storedData.filter((item) => item.id !== id);
  setLocalStorage(key, updatedData);
}
