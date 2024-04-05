interface LocalData {
  data: DataObject;
  id: string;
}

interface DataObject {
  score: number;
}

const getLocalStorage = (id: string) => {
  const data = localStorage.getItem(id);
  if (data === null) return 0;
  return JSON.parse(data);
};

export const setLocalStorage = ({ data, id }: LocalData) => {
  const inputData = JSON.stringify(data);
  window.localStorage.setItem(id, inputData);
};

export const getScore = (id: string) => {
  const data = getLocalStorage(id.toString());
  if (data === 0) return 0;
  return data.score;
};
