import { renderSearchUI } from "../render/renderSearchUI";

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

  const thumbnailListElement = document.getElementById(
    "search-thumbnail-list",
  ) as HTMLUListElement;

  const url = new URL(window.location.href);
  const params = url.searchParams;

  params.set("keyword", keyword);
  params.set("page", String(1));
  url.search = params.toString();
  window.history.pushState({}, "", url.toString());

  thumbnailListElement.innerHTML = "";
  await renderSearchUI(keyword);
};
