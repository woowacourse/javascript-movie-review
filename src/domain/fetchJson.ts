import { NETWORK_ERROR_MESSAGE } from '../constants/messages';

type FetchJson = <T>(url: string) => Promise<T>;

const fetchJson: FetchJson = async api => {
  const response = await fetch(api);

  if (!response.ok) {
    throw new Error(NETWORK_ERROR_MESSAGE);
  }

  return response.json();
};

export default fetchJson;
