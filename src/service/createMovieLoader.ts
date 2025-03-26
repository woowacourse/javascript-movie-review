import type { FetchOptions } from "../util/fetch";
import { fetchUrl } from "../util/fetch";
import type { TMDBResponse } from "../../types/TMDB";
import { TOTAL_PAGE } from "../setting/settings";
import { ERROR_MESSAGE } from "../setting/ErrorMessage";
import Toast from "../components/Toast/Toast";

export default function createMovieLoader(
  url: string,
  queryObject: Record<string, string>,
  options: FetchOptions,
  searchTerm?: string
) {
  let page = 1;

  return async () => {
    const newQueryObject = searchTerm
      ? { query: searchTerm, ...queryObject, page: String(page) }
      : { ...queryObject, page: String(page) };
    let response = null;
    try {
      response = await fetchUrl<TMDBResponse>(url, newQueryObject, options);
    } catch (error) {
      if (error instanceof Error) {
        Toast.showToast(error.message, "error", 5000);
      }
      return { results: [], isLastPage: true };
    }

    if (!response || !response.results)
      throw new Error(ERROR_MESSAGE.FETCH_ERROR);
    if (response.results.length === 0) throw new Error(ERROR_MESSAGE.NO_DATA);

    const { results, total_pages } = response;
    const pageLimit = Math.min(TOTAL_PAGE, total_pages);

    page++;

    return { results, isLastPage: page > pageLimit };
  };
}
