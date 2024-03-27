import { ResponseMovieList } from '../interface/api';
import { Params, convertObjectToURLSearchParams } from './convertObjectToURLSearchParams';

// fetch 포장 함수
export default async function fetchDataFromUrl<T = ResponseMovieList>(
  url: string,
  query: Record<string, Params>,
): Promise<T> {
  const paramsObj = convertObjectToURLSearchParams(query);
  const queryUrl = url + '?' + paramsObj;
  const response = await fetch(queryUrl);

  if (!response.ok) {
    const errorBody = await response.json(); // 오류 메시지가 JSON 형태일 경우
    const errorMessage = errorBody.message || '알 수 없는 에러 발생';
    throw new Error(`${errorMessage} 다시 요청해주세요.`);
  }

  return await response.json();
}