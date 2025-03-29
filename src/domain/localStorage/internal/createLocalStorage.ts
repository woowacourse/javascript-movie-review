const createLocalStorage = (key: string) => {
  const myKey = key;

  const getDataFromLocalStorage = <T>(): T | null => {
    const data = localStorage.getItem(myKey);
    if (data === null) {
      return null;
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  };

  const setDataToLocalStorage = <T>(data: T) => {
    localStorage.setItem(myKey, JSON.stringify(data));
  };

  return { getDataFromLocalStorage, setDataToLocalStorage };
};

export default createLocalStorage;
