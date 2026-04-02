import { renderSearchUI } from "../render/renderSearchUI";

export const handleMovieSearch = async (keyword: string) => {
  if (keyword.trim() === "") {
    const hasKeyword = new URLSearchParams(window.location.search).has(
      "keyword",
    );
    if (hasKeyword) {
      window.location.href = "/";
    }
    return;
  }

  const searchInput = document.getElementById(
    "search-input",
  ) as HTMLInputElement | null;
  const banner = document.getElementById("background-container");
  const subTitle = document.getElementById("sub-title");
  const thumbnailListElement = document.getElementById(
    "search-thumbnail-list",
  ) as HTMLUListElement;

  if (!banner || !subTitle || searchInput?.value.trim() === "") return;

  const url = new URL(window.location.href);
  const params = url.searchParams;

  params.set("keyword", keyword);
  params.set("page", String(1));
  url.search = params.toString();
  window.history.pushState({}, "", url.toString());

  thumbnailListElement.innerHTML = "";
  await renderSearchUI(keyword);
};
