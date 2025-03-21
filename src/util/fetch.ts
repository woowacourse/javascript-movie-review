import { ERROR_MESSAGE } from "../setting/ErrorMessage";

export interface FetchOptions {
  headers?: Record<string, string>;
  method?: string;
  body?: BodyInit | null;
}

export async function fetchUrl<T>(
  url: string,
  queryObject: URLSearchParams,
  options: FetchOptions = {}
): Promise<T> {
  const queryString = new URLSearchParams(queryObject).toString();
  const finalUrl = queryString ? `${url}?${queryString}` : url;

  try {
    const response = await fetch(finalUrl, options);

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.SERVER_ERROR);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (!navigator.onLine) {
      throw new Error(ERROR_MESSAGE.NETWORK_DISCONNECTED);
    }

    throw new Error(ERROR_MESSAGE.FETCH_ERROR);
  }
}
