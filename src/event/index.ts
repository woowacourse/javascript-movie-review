import { renderMoviesList } from "../domains/renderMoviesList";
import { store } from "../store";
import { isElement } from "../utils";

window.addEventListener("click", async (event) => {
  const { target } = event;

  if (isElement(target) && target.closest(".show-more")) {
    store.page = store.page + 1;
    renderMoviesList();
  }
});

window.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { target } = event;

  if (isElement(target) && target.closest(".top-rated-search")) {
    const $searchInput = target.querySelector(
      ".top-rated-search-input"
    ) as HTMLInputElement;
    const value = $searchInput?.value;

    (target as HTMLFormElement).reset();

    if (value) {
      store.searchKeyword = value;
      store.page = 1;

      const $title = document.querySelector(".thumbnail-title");
      if ($title) $title.textContent = `"${store.searchKeyword}" 검색 결과`;

      const $ul = document.querySelector(".thumbnail-list");
      if ($ul) $ul.innerHTML = "";

      const $topRatedContainer = document.querySelector(".top-rated-container");
      const $overlay = document.querySelector(".overlay");

      $topRatedContainer?.classList.add("close");
      $overlay?.classList.add("close");

      store.movies = [];

      renderMoviesList();
    }
  }
});
