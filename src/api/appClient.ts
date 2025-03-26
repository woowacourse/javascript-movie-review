import { BASE_URL, ERROR } from './constant';
import { httpErrorStatus } from './error/httpErrorStatus';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const requestAppClient = async (method: HttpMethod, query: string, params: Record<string, string>) => {
  const newParams = new URLSearchParams(params);
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

    const data = await response.json();

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

export const getAppClient = (query: string, params: Record<string, string>) => {
  return requestAppClient('GET', query, params);
};
