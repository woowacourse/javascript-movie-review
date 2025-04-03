export const createStorage = <T>(
  key: string,
  storage = window.localStorage
) => {
  if (typeof window === "undefined") {
    throw new Error("storage를 사용할 수 없습니다.");
  }
  const get = (): T => {
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : ([] as T);
  };

  const set = (value: T): void => {
    storage.setItem(key, JSON.stringify(value));
  };

  const remove = (): void => {
    storage.removeItem(key);
  };

  return { get, set, remove };
};
