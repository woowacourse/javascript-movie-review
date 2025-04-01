import { fetchUrl } from "../util/fetch";
import { defaultOptions, defaultQueryObject } from "../setting/settings";

export default function createInfiniteQuery<T>(
  url: string,
  searchTerm?: string
) {
  let page = 1;

  return async () => {
    const newQueryObject = searchTerm
      ? { query: searchTerm, ...defaultQueryObject, page: String(page) }
      : { ...defaultQueryObject, page: String(page) };
    const response = await fetchUrl<T>(url, newQueryObject, defaultOptions);

    page++;
    return response as T;
  };
}
