export function getURLSearchParam(name: string, defaultValue: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name) ?? defaultValue
}

export function setURLSearchParam(name: string, value: string) {
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  window.history.replaceState({}, "", url);
}

export function getQuery() {
  return getURLSearchParam("query", "");
}

export function getPage() {
  const pageStr = getURLSearchParam("page", "1");
  const pageNum = Number(pageStr)
  const page = isNaN(pageNum) || pageNum % 1 || pageNum < 1 ? 1 : pageNum;
  return page;
}

export function setQuery(query: string) {
  setURLSearchParam("query", query)
}

export function setPage(page: number) {
  setURLSearchParam("page", page.toString())
}