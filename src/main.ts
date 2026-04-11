import { handleMovieSearch } from "./dom/eventHandler/handleMovieSearch";
import { renderHomePage } from "./pages/home.ts";
import { renderSearchPage } from "./pages/search.ts";

const main = async () => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const keyword = params.get("keyword");

  addEventListener();
  if (keyword) {
    await renderSearchPage();
  } else {
    await renderHomePage("init");
  }
};

const addEventListener = () => {
  // TODO: 헤더 컴포넌트를 분리, 이벤트 리스너를 컴포넌트 책임으로 변경
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
};

await main();
