export const setParams = (query: string, key: string) => {
  const params = new URLSearchParams(window.location.search);

  if (query !== "") {
    params.set(key, query);
  }

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  history.pushState(null, "", newUrl);
};
