import { Movie } from "../../types/movie.ts";

const createStorage = <T>(
  key: string,
  storage: Storage = typeof window !== "undefined"
    ? window.localStorage
    : undefined!
) => {
  if (!storage) {
    throw new Error("storage를 사용할 수 없습니다.");
  }

  const get = (): T | null => {
    const item = storage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error parsing localStorage item for key "${key}":`, error);
      return null;
    }
  };

  const set = (value: T) => {
    try {
      const jsonValue = JSON.stringify(value);
      storage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error setting localStorage item for key "${key}":`, error);
    }
  };

  const remove = () => {
    storage.removeItem(key);
  };

  return { get, set, remove };
};

const moviesStorage = createStorage<Movie[]>("movies");

export { createStorage, moviesStorage };
