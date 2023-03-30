export const getLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : null;
};

export const setLocalStorage = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));
