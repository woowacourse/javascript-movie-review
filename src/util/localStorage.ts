export const saveData = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getData = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "");
};
