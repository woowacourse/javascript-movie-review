export const handleMovieSearch = (keyword: string) => {
  if (keyword.trim() === "") {
    const hasKeyword = new URLSearchParams(window.location.search).has(
      "keyword",
    );
    if (hasKeyword) {
      window.location.href = import.meta.env.BASE_URL;
    }
    return;
  }

  const url = new URL(window.location.href);
  const params = url.searchParams;

  params.set("keyword", keyword);
  sessionStorage.setItem("page", "1");

  url.search = params.toString();
  window.location.href = url.toString();
};
