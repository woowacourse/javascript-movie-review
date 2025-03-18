interface FetchOptions {
  headers?: Record<string, string>;
  method?: string;
  body?: BodyInit | null;
}
interface Query {
  [key: string]: string | number;
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
  return response.json();
}
