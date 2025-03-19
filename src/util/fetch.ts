import { ERROR_MESSAGE } from "../setting/settings";

export interface FetchOptions {
  headers?: Record<string, string>;
  method?: string;
  body?: BodyInit | null;
}

//language=en-US&page=1
export async function fetchUrl<T>(
  url: string,
  queryObject: URLSearchParams, // 기본값 설정
  options: FetchOptions = {}
): Promise<T> {
  const queryString = new URLSearchParams(queryObject).toString();
  const finalUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetch(finalUrl, options);

  if (!response.ok) throw new Error(ERROR_MESSAGE.FETCH_ERROR);

  return response.json();
}
