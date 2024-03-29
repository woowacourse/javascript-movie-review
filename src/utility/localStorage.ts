export const setItemToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};
