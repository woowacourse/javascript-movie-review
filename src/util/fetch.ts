import { ERROR_MESSAGE } from "../setting/ErrorMessage.ts";

export interface FetchOptions {
  headers?: Record<string, string>;
  method?: string;
  body?: BodyInit | null;
}

export async function fetchUrl<T>(
  url: string,

  queryObject: URLSearchParams,
  options: FetchOptions = {},
  path?: string
): Promise<T> {
  function buildMovieUrl(baseUrl: string, path: string, queryObject = {}) {
    let url = baseUrl;
    if (path) {
      url += `/${path}`;
    }

    const queryString = new URLSearchParams(queryObject).toString();
    return queryString ? `${url}?${queryString}` : url;
  }

  const finalUrl = buildMovieUrl(url, path, queryObject);
  // AbortController를 생성하여 signal을 옵션에 추가
  const controller = new AbortController();
  options.signal = controller.signal;

  try {
    const response = await fetch(finalUrl, options);

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.SERVER_ERROR);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // fetch 요청이 취소된 경우
    if ((error as any).name === "AbortError") {
      console.log("Fetch 요청이 취소되었습니다.");
      throw error;
    }

    if (!navigator.onLine) {
      throw new Error(ERROR_MESSAGE.NETWORK_DISCONNECTED);
    }

    throw new Error(ERROR_MESSAGE.FETCH_ERROR);
  }
}
