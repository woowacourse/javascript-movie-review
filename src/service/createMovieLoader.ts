import type { FetchOptions } from "../util/fetch";
import { fetchUrl } from "../util/fetch";
import type { TMDBResponse } from "../../types/TMDB";
import { TOTAL_PAGE } from "../setting/settings";

export default function createMovieLoader(
  url: string,
  queryObj: URLSearchParams,
  options: FetchOptions,
  searchTerm?: string
) {
  let page = 1;

  return async () => {
    const queryObject = searchTerm
      ? { query: searchTerm, ...queryObj, page }
      : { ...queryObj, page };

    const { results } = await fetchUrl<TMDBResponse>(url, queryObject, options);

    if (results.length === 0) throw new Error("검색 값을 찾지 못했어요.");
    page++;

    if (page >= TOTAL_PAGE) return { results, isLastPage: true };
    return { results, isLastPage: false };
  };
}
