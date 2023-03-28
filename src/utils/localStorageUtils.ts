const setLocalStorageItem = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageItems = <T>(key: string): T | null => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const getRatings = () => {
  return getLocalStorageItems("ratings") || {};
};

export { setLocalStorageItem, getLocalStorageItems, getRatings };
