const setLocalStorageItem = (key: string, value: any) => {
  const localStorage = window.localStorage;
  const stringified = JSON.stringify(value);

  localStorage.setItem(key, stringified);
};

export default setLocalStorageItem;
