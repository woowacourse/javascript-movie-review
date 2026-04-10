export function getPramFromURL(name: string, defaultValue: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name) ?? defaultValue
}

export function getQuery() {
  return getPramFromURL("query", "");
}

export function getPage() {
  const pageStr = getPramFromURL("page", "1");
  const page = isNaN(Number(pageStr)) ? 1 : Number(pageStr);
  return Math.max(1, page);
}

export function setQuery(query: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("query", query);
  window.history.replaceState({}, "", url);
}

export function setPage(page: number) {
  const url = new URL(window.location.href);
  url.searchParams.set("page", String(page));
  window.history.replaceState({}, "", url);
}
