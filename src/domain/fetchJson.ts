import { FetchJson } from '../@types/fetchJsonType';

const fetchJson: FetchJson = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export default fetchJson;
