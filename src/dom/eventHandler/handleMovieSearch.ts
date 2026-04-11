import { renderSearchPage } from "../../pages/search.ts";

export const handleMovieSearch = async (keyword: string) => {
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
  params.set("page", String(1));
  url.search = params.toString();
  window.history.pushState({}, "", url.toString());

  await renderSearchPage();
};
