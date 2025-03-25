export const updateUrl = (params: URLSearchParams) => {
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  history.pushState(null, "", newUrl);
};
