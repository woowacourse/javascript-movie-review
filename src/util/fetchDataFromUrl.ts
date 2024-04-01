import { ResponseMovieList } from '../api/DB/TMDBType';
import { Params, convertObjectToURLSearchParams } from './convertObjectToURLSearchParams';

// fetch 포장 함수
export default async function fetchDataFromUrl<T = ResponseMovieList>(
  url: string,
  query?: Record<string, Params>,
): Promise<T> {
  const paramsObj = query ? convertObjectToURLSearchParams(query) : '';
  const queryUrl = url + '?' + paramsObj;
  const response = await fetch(queryUrl);

  if (!response.ok) {
    if (response.status === 404) throw new Error('클라이언트 에러');
    else if (response.status === 500) throw new Error('서버 에러');
    // const errorBody = await response.json(); // 오류 메시지가 JSON 형태일 경우
    // const errorMessage = errorBody.message || '알 수 없는 에러 발생';
    else throw new Error('알 수 없는 오류 발생');
  }

  return await response.json();
}
