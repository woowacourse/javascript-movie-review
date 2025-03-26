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

  const response = await fetch(finalUrl, options);

  if (!response.ok || !navigator.onLine)
    throw new Error(ERROR_MESSAGE.FETCH_ERROR);

  const data = await response.json();
  return data;
}
