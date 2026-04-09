export const getPageParam = () => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const prevPage = Number(params.get("page") || 1);
  return prevPage;
};

export const incrementPageParam = () => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const prevPage = getPageParam();
  params.set("page", String(prevPage + 1));
  url.search = params.toString();
  window.history.pushState({}, "", url.toString());
};
