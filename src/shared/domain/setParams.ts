export const setParams = (query: string = "") => {
  const params = new URLSearchParams(window.location.search);

  if (query !== "") {
    params.set("query", query);
  }

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  history.pushState(null, "", newUrl);
};
