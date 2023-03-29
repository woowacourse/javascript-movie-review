interface ILocalStorageProps {
  key: string;
}

interface ISetLocalStoageProps extends ILocalStorageProps {
  value: string;
}

interface IStringifyOrParseProps<T> extends ILocalStorageProps {
  data: T;
}

const getLocalStorage = ({ key }: ILocalStorageProps): string | null => {
  return localStorage.getItem(key); // 값을 받고 parse하는 과정이 필요함.
};

const setLocalStorage = ({ key, value }: ISetLocalStoageProps) => {
  localStorage.setItem(key, value);
};

export const parseLocalStorage = <T>({ key, data }: IStringifyOrParseProps<T>): T => {
  const stringStorage = getLocalStorage({ key });

  if (!stringStorage) return data;

  const parsedData = JSON.parse(stringStorage);
  return parsedData;
};

export const stringifyLocalStorage = <T>({ data, key }: IStringifyOrParseProps<T>) => {
  const stringifyData = JSON.stringify(data);

  setLocalStorage({ key, value: stringifyData });
};
