export function getURLSearchParam<T>(name: string, defaultValue: T) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name) ?? defaultValue
}

export function setURLSearchParam(name: string, value: string) {
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  history.replaceState({}, "", url);
}

export function getURLSearchParams() {
  return new URLSearchParams(window.location.search);
}

export function setURLSearchParams(params: Record<string, string>) {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  })
  history.replaceState({}, "", url);
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