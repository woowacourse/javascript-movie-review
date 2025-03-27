import { MovePramsType } from '../type';
import { transformKeysToCamel } from '../util/transformKeysToCamel';
import { BASE_URL, ERROR } from './constant';
import { httpErrorStatus } from './error/httpErrorStatus';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const requestAppClient = async <T>(method: HttpMethod, query: string, params: T) => {
  const newParams = new URLSearchParams(params as Record<string, string>);
  const newUrl = `${BASE_URL}${query}?${newParams.toString()}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    }
  };

  try {
    const response = await fetch(newUrl, options);
    if (!response.ok) {
      httpErrorStatus(response.status);
    }

    const data = transformKeysToCamel(await response.json());

    return data;
  } catch (error) {
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      throw new Error(ERROR.NETWORK);
    }

    if (error instanceof Error) {
      throw Error(ERROR.NOT_FOUND);
    }
  }
};

export const getAppClient = (query: string, params: MovePramsType) => {
  return requestAppClient('GET', query, params);
};
