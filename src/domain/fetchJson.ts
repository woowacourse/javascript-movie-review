import { NETWORK_ERROR_MESSAGE, NOT_FOUND_MESSAGE } from '../constants/messages';

const fetchJson = async (apiLink: string, process: any) => {
  const response = await fetch(apiLink);

  if (response.ok) {
    return process(await response.json());
  }

  if (response.status === 404) {
    throw new Error(NOT_FOUND_MESSAGE);
  } else {
    throw new Error(NETWORK_ERROR_MESSAGE);
  }
};

export default fetchJson;
