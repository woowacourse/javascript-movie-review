import { handleMovieSearch } from "./dom/eventHandler/handleMovieSearch";
import {
  handleMainSeeMore,
  handleSearchSeeMore,
} from "./dom/eventHandler/handleSeeMore";
import { renderInitialUI } from "./dom/render/renderInitialUI";
import { renderMainUI } from "./dom/render/renderMainUI";
import { renderSearchUI } from "./dom/render/renderSearchUI";

const logo = document.getElementById("logo");
const searchInput = document.getElementById(
  "search-input",
) as HTMLInputElement | null;
const searchButton = document.getElementById("search-button");
const mainSeeMoreButton = document.getElementById("main-see-more-button");
const searchSeeMoreButton = document.getElementById("search-see-more-button");

if (logo) {
  logo.addEventListener("click", () => {
    window.location.href = "/";
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

if (mainSeeMoreButton) {
  mainSeeMoreButton.addEventListener("click", () => {
    handleMainSeeMore();
  });
}

if (searchSeeMoreButton && searchInput) {
  searchSeeMoreButton.addEventListener("click", () => {
    handleSearchSeeMore(searchInput.value);
  });
}

const render = async () => {
  renderInitialUI();

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
