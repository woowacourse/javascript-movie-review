import MainUI from "./dom/render/MainUI";
import SearchUI from "./dom/render/SearchUI";
import { getKeywordFromURL } from "./utils/getKeywordFromURL";
import { setURLParams } from "./utils/setURLParams";

const mainUI = new MainUI();
const searchUI = new SearchUI();

const logo = document.getElementById("logo");
const searchInput = document.getElementById(
  "search-input",
) as HTMLInputElement | null;
const searchButton = document.getElementById("search-button");
const mainSeeMoreButton = document.getElementById("main-see-more-button");
const searchSeeMoreButton = document.getElementById("search-see-more-button");
const sentinel = document.getElementById("sentinel");

if (logo) {
  logo.addEventListener("click", () => {
    window.location.href = import.meta.env.BASE_URL;
  });
}

if (searchInput && searchButton) {
  searchButton.addEventListener("click", () => {
    setURLParams({ keyword: searchInput.value, page: "1" });
    mainUI.hide();
    searchUI.load();
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      setURLParams({ keyword: searchInput.value, page: "1" });
      mainUI.hide();
      searchUI.load();
    }
  });
}

if (mainSeeMoreButton) {
  mainSeeMoreButton.addEventListener("click", () => {
    mainUI.seeMore();
  });
}

if (searchSeeMoreButton && searchInput) {
  searchSeeMoreButton.addEventListener("click", () => {
    searchUI.seeMore();
  });
}

const render = async () => {
  const keyword = getKeywordFromURL();
  if (keyword) {
    await searchUI.load();
  } else {
    await mainUI.load();
  }
};

await render();

if (sentinel) {
  let isLoading = false;

  const observer = new IntersectionObserver(
    async (entries, observer) => {
      if (!entries[0].isIntersecting || isLoading) return;

      isLoading = true;
      try {
        const keyword = getKeywordFromURL();
        const hasMore = keyword
          ? await searchUI.seeMore()
          : await mainUI.seeMore();
        if (!hasMore) observer.disconnect();
      } finally {
        isLoading = false;
      }
    },
    { rootMargin: "200px" },
  );

  observer.observe(sentinel);
}
