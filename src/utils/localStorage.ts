export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  const localStorageItem = localStorage.getItem(key);

  if (localStorageItem === null) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }

  return JSON.parse(localStorageItem);
};

export const setLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
