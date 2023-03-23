export const setLocalstorage = <T, U>(key: T, data: U) => {
  window.localStorage.setItem(String(key), JSON.stringify(data));
};

export const getLocalstorage = <T>(key: T) => {
  const data = window.localStorage.getItem(String(key));
  return data === null ? null : JSON.parse(data);
};
