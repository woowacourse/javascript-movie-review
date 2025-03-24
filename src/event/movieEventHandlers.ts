import { renderMoviesList } from "../domains/renderMoviesList";
import { movieStore } from "../store/movieStore";
import { isElement } from "../utils/domUtils";

window.addEventListener("click", async (event) => {
  const { target } = event;

  if (isElement(target) && target.closest(".show-more")) {
    movieStore.page = movieStore.page + 1;
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
      movieStore.searchKeyword = value;
      movieStore.page = 1;

      const $title = document.querySelector(".thumbnail-title");
      if ($title)
        $title.textContent = `"${movieStore.searchKeyword}" 검색 결과`;

      const $ul = document.querySelector(".thumbnail-list");
      if ($ul) $ul.innerHTML = "";

      const $topRatedContainer = document.querySelector(".top-rated-container");
      const $overlay = document.querySelector(".overlay");

      $topRatedContainer?.classList.add("close");
      $overlay?.classList.add("close");

      movieStore.movies = [];

      renderMoviesList();
    }
  }
});
