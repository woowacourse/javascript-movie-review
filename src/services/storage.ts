export const setLocalStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string): string | null => {
  return window.localStorage.getItem(key);
};
