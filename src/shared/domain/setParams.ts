export const setParams = (query: string = "", page: number = 1) => {
  const params = new URLSearchParams(window.location.search);

  if (query !== "") {
    params.set("query", query);
  }

  params.set("page", page.toString());
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  history.pushState(null, "", newUrl);
};
