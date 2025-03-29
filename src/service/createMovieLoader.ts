import { fetchUrl } from "../util/fetch";
import type { TMDBResponse } from "../../types/TMDB";
import {
  defaultOptions,
  defaultQueryObject,
  TOTAL_PAGE,
} from "../setting/settings";
import { ERROR_MESSAGE } from "../setting/ErrorMessage";
import Toast from "../components/Toast/Toast";

export default function createMovieLoader(url: string, searchTerm?: string) {
  let page = 1;

  return async () => {
    const newQueryObject = searchTerm
      ? { query: searchTerm, ...defaultQueryObject, page: String(page) }
      : { ...defaultQueryObject, page: String(page) };
    let response = null;
    try {
      response = await fetchUrl<TMDBResponse>(
        url,
        newQueryObject,
        defaultOptions
      );
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
