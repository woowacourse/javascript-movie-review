export const getQueryParam = (url: URL) => {
  const params = new URLSearchParams(url.search);
  const query = params.get("query") ?? "";

  return query;
};
