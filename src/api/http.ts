import { ITMDBFetchedError } from '../domain/Movie';
import { MESSAGE, statusCodeToErrorMessage } from './statusCode';

export const TMDBFetcher = async <T>(url: string): Promise<T> => {
  if (!navigator.onLine) {
    throw new Error(MESSAGE.OFFLINE);
  }

  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    const errorData: ITMDBFetchedError = data;
    throw new Error(statusCodeToErrorMessage(errorData.status_code));
  }

  return data;
};
