const createLocalStorage = (key: string) => {
  const myKey = key;

  const getData = <T>(): T | null => {
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

  const setData = <T>(data: T) => {
    localStorage.setItem(myKey, JSON.stringify(data));
  };

  return { getData, setData };
};

export default createLocalStorage;
