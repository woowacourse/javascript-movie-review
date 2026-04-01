export const navigate = (path: string) => {
  history.pushState(null, "", path);
};

export const getSearchParams = (queryKey: string) => {
  const params = new URLSearchParams(location.search);
  return params.get(queryKey);
};

export const hasSearchParams = (queryKey: string): boolean => {
  const params = new URLSearchParams(location.search);
  return params.get(queryKey) === null ? false : true;
};
