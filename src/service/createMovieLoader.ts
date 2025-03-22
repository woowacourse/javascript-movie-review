import type { FetchOptions } from "../util/fetch";

import { TOTAL_PAGE } from "../setting/settings.ts";
import { getPlainQuery, buildQuery } from "../util/query";
import { fetchMovies } from "./movieService";

export default function createMovieLoader(
  url: string,
  queryObj: URLSearchParams | { [key: string]: string },
  options: FetchOptions,
  onError: (error: Error) => void,
  searchTerm?: string
) {
  let page = 1;

  return async () => {
    const plainQuery = getPlainQuery(queryObj);
    const queryObject = buildQuery(plainQuery, searchTerm, page);
    const response = await fetchMovies(url, queryObject, options, onError);
    const { results, total_pages } = response;
    const pageLimit = Math.min(TOTAL_PAGE, total_pages);

    page++;

    return { results, isLastPage: page > pageLimit };
  };
}
