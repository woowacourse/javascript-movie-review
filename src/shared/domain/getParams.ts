export const getParams = (url: URL) => {
  const params = new URLSearchParams(url.search);
  const query = params.get("query") ?? null;
  const pageStr = params.get("page");
  const currentPage = pageStr ? parseInt(pageStr) : 1;
  const nextPage = currentPage + 1;

  return { query, currentPage, nextPage };
};
