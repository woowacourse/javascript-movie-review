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
