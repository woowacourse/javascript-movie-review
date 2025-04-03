import { fetchUrl } from "../util/fetch";
import { defaultOptions, defaultQueryObject } from "../setting/settings";

interface CreateInfiniteQueryProp {
  searchTerm?: string;
  searchKey?: string;
  baseQuery?: Record<string, string | boolean | number>;
}

export function createSingleFetchQuery<T>(
  url: string,
  options: CreateInfiniteQueryProp = {}
) {
  return async () => {
    const { searchTerm, searchKey = "query", baseQuery = {} } = options;

    const query: Record<string, string> = {
      ...defaultQueryObject,
      ...baseQuery,
      ...(searchTerm ? { [searchKey]: searchTerm } : {}),
    };

    return fetchUrl<T>(url, query ?? {}, defaultOptions);
  };
}
