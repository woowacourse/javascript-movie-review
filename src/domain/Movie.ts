interface LocalData {
  data: DataObject;
  id: string;
}

interface DataObject {
  score: number;
}

export const getLocalStorage = (id: string) => {
  const data = localStorage.getItem(id);
  if (data === null) return 0;
  return JSON.parse(data);
};

export const setLocalStorage = ({ data, id }: LocalData) => {
  const inputData = JSON.stringify(data);
  window.localStorage.setItem(id, inputData);
};
