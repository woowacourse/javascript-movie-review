import { fetchUrl } from "../util/fetch";
import { defaultOptions, defaultQueryObject } from "../setting/settings";

interface CreateInfiniteQueryProp {
  searchTerm?: string;
  searchKey?: string;
}

export default function createInfiniteQuery<T>(
  url: string,
  options: CreateInfiniteQueryProp = {}
) {
  const { searchTerm, searchKey = "query" } = options;

  let page = 1;

  return async () => {
    const query: Record<string, string> = {
      ...defaultQueryObject,
      ...(searchTerm ? { [searchKey]: searchTerm } : {}),
      page: String(page),
    };

    const response = await fetchUrl<T>(url, query, defaultOptions);
    page++;
    return response as T;
  };
}
