export const saveData = <T>(key: string, data: T) => {
  let newData = data;

  if (localStorage.getItem(key)) {
    newData = { ...getData(key), ...data };
  }

  localStorage.setItem(key, JSON.stringify(newData));
};

export const getData = (key: string) => {
  const data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  }
};
