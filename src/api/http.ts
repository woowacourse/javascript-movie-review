import { statusCodeToErrorMessage } from './statusCode';

export const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(statusCodeToErrorMessage(data.success_code));
  }

  return data;
};
