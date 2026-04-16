export const getKeywordFromURL = () => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const keyword = params.get("keyword");
  return keyword;
};
