import { handleMovieSearch } from "./dom/eventHandler/handleMovieSearch";
import { renderLoadingUI } from "./dom/render/renderLoadingUI.ts";
import { renderMainUI } from "./dom/render/renderMainUI";
import { renderSearchUI } from "./dom/render/renderSearchUI";

const logo = document.getElementById("logo");
const searchInput = document.getElementById(
  "search-input",
) as HTMLInputElement | null;
const searchButton = document.getElementById("search-button");

if (logo) {
  logo.addEventListener("click", () => {
    window.location.href = import.meta.env.BASE_URL;
  });
}

if (searchInput && searchButton) {
  searchButton.addEventListener("click", () =>
    handleMovieSearch(searchInput.value),
  );

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleMovieSearch(searchInput.value);
  });
}

const render = async () => {
  renderLoadingUI();

  const url = new URL(window.location.href);
  const params = url.searchParams;
  const keyword = params.get("keyword");
  if (keyword) {
    await renderSearchUI(keyword);
  } else {
    await renderMainUI();
  }
};

await render();
