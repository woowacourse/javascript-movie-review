import { handleMovieSearch } from "./dom/eventHandler/handleMovieSearch";
import { renderHomePage } from "./pages/home.ts";
import { renderSearchPage } from "./pages/search.ts";

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

const main = async () => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const keyword = params.get("keyword");
  if (keyword) {
    await renderSearchPage();
  } else {
    await renderHomePage();
  }
};

await main();
