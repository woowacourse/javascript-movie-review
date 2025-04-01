import { fetchUrl } from "../util/fetch";
import { defaultOptions, defaultQueryObject } from "../setting/settings";

interface CreateInfiniteQueryProp {
  searchTerm?: string;
  searchKey?: string;
  baseQuery?: Record<string, string | boolean | number>;
}

export default function createInfiniteQuery<T>(
  url: string,
  options: CreateInfiniteQueryProp = {}
) {
  const { searchTerm, searchKey = "query", baseQuery = {} } = options;

  let page = 1;

  return async () => {
    const query: Record<string, string> = {
      ...defaultQueryObject,
      ...baseQuery,
      ...(searchTerm ? { [searchKey]: searchTerm } : {}),
      page: String(page),
    };

    const response = await fetchUrl<T>(url, query, defaultOptions);
    page++;
    return response as T;
  };
}
