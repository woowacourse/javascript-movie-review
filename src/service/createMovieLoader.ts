import type { FetchOptions } from "../util/fetch";
import { fetchUrl } from "../util/fetch";
import type { TMDBResponse } from "../../types/TMDB";
import { TOTAL_PAGE } from "../setting/settings";
import { ERROR_MESSAGE } from "../setting/ErrorMessage";

export default function createMovieLoader(
  url: string,
  queryObj: URLSearchParams,
  options: FetchOptions,
  onError: (error: Error) => void,
  searchTerm?: string
) {
  let page = 1;

  return async () => {
    const queryObject = searchTerm
      ? { query: searchTerm, ...queryObj, page }
      : { ...queryObj, page };
    let response = null;
    try {
      response = await fetchUrl<TMDBResponse>(url, queryObject, options);
      if (!response || !response.results)
        throw new Error(ERROR_MESSAGE.FETCH_ERROR);
      if (response.results.length === 0) throw new Error(ERROR_MESSAGE.NO_DATA);
    } catch (error) {
      if (onError) {
        onError(error);
      } else {
        throw error;
      }
      return { results: [], isLastPage: true };
    }

    const { results, total_pages } = response;
    const pageLimit = Math.min(TOTAL_PAGE, total_pages);

    page++;

    return { results, isLastPage: page > pageLimit };
  };
}
