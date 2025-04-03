export const getQueryParam = (url: URL, key: string) => {
  const params = new URLSearchParams(url.search);
  const query = params.get(key) ?? "";

  return query;
};
