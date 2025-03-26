import type { FetchOptions } from "../util/fetch.ts";

import { TOTAL_PAGE } from "../setting/settings.ts";
import { getPlainQuery, buildQuery } from "../util/query.ts";
import { fetchMovies } from "./movieService.ts";

export default function createMovieLoader(
  url: string,
  queryObj: URLSearchParams | { [key: string]: string },
  options: FetchOptions,
  onError: (error: Error) => void,
  searchTerm?: string
) {
  let page = 1;
  let errorOccurred = false;

  // 별도의 에러 핸들러를 정의하여 에러 발생 시 플래그를 설정하고 onError를 호출합니다.
  const handleError = (error: Error) => {
    errorOccurred = true;
    onError(error);
  };

  return async () => {
    const plainQuery = getPlainQuery(queryObj);
    const queryObject = buildQuery(plainQuery, searchTerm, page);
    const response = await fetchMovies(url, queryObject, options, handleError);

    if (errorOccurred) {
      // 에러가 발생한 경우, 플래그를 초기화한 후 페이지 번호를 증가시키지 않고 그대로 반환합니다.
      errorOccurred = false;
      return { results: response.results, isLastPage: true };
    }

    const { results, total_pages } = response;
    const pageLimit = Math.min(TOTAL_PAGE, total_pages);

    // 정상적인 경우에만 페이지 번호를 증가시킵니다.
    page++;

    return { results, isLastPage: page > pageLimit };
  };
}
