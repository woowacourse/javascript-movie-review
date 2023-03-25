import { NETWORK_ERROR_MESSAGE, NOT_FOUND_MESSAGE } from '../constants/messages';

const fetchJson = async <T>(apiLink: string, process?: (data: any) => T): Promise<T> => {
  const response = await fetch(apiLink);

  if (response.ok) {
    if (process) return process(await response.json());
    return await response.json();
  }

  if (response.status === 404) {
    throw new Error(NOT_FOUND_MESSAGE);
  }

  throw new Error(NETWORK_ERROR_MESSAGE);
};

export default fetchJson;
