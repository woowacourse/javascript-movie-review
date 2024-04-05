/* eslint-disable import/prefer-default-export */

// eslint-disable-next-line max-lines-per-function
function fetchErrorCheck(status: number) {
  if (status === 200) return;

  // eslint-disable-next-line default-case
  switch (status) {
    case 401:
      throw new Error(`${status} 유효하지 않은 접근입니다.`);
    case 403:
      throw new Error(`${status} 접근 권한이 없습니다.`);
    case 404:
      throw new Error(`${status} 컨텐츠를 찾을 수 없습니다.`);
    case 500:
    case 502:
    case 503:
      throw new Error(`${status} 서버에서 문제가 발생했습니다.`);
  }
}

interface IFetchParams<T> {
  fetcherFunction: (fetchParams: T) => Promise<Response>;
  fetchParams: T;
}

export async function fetchFetcherFunction<T>({ fetcherFunction, fetchParams }: IFetchParams<T>) {
  const response = await fetcherFunction(fetchParams);
  fetchErrorCheck(response.status);
  return response.json();
}
