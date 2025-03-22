export function getPlainQuery(
  queryObj: URLSearchParams | { [key: string]: string }
): {
  [key: string]: string;
} {
  return queryObj instanceof URLSearchParams
    ? Object.fromEntries(queryObj.entries())
    : queryObj;
}
export function buildQuery(
  plainQuery: { [key: string]: string },
  searchTerm: string | undefined,
  page: number
): { [key: string]: any } {
  return searchTerm
    ? { query: searchTerm, ...plainQuery, page }
    : { ...plainQuery, page };
}
