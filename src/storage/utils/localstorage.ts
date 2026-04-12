export const getItemFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as string) : null;
};

export const setItemInLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
