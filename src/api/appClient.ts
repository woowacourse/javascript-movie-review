import { BASE_URL, ERROR } from './constant';
import { httpErrorStatus } from './error/httpErrorStatus';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const requestAppClient = async <T, P>(method: HttpMethod, query: string, params: P): Promise<T> => {
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
    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      throw new Error(ERROR.NETWORK);
    }

    throw new Error(ERROR.NOT_FOUND);
  }
};

export const getAppClient = <T, P>(query: string, params: P) => {
  return requestAppClient<T, P>('GET', query, params);
};
