import { renderMoviesList } from "../domains/renderMoviesList";
import { store } from "../store";
import { isElement } from "../utils";

window.addEventListener("click", async (event) => {
  const { target } = event;

  if (isElement(target) && target.closest(".show-more")) {
    store.page += 1;
    renderMoviesList();
  }
});

window.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { target } = event;

  if (!isElement(target)) return;

  if (target.closest(".top-rated-search")) {
    const formData = new FormData(target as HTMLFormElement);
    const modalInput = Object.fromEntries(formData);

    const value = modalInput.search.toString();

    store.searchKeyword = value;
    store.page = 1;

    const $title = document.querySelector(".thumbnail-title");
    if ($title) $title.textContent = `"${store.searchKeyword}" 검색 결과`;

    const $thumbnailList = document.querySelector(".thumbnail-list");
    if ($thumbnailList) $thumbnailList.innerHTML = "";

    document.querySelector(".top-rated-container")?.classList.add("close");
    document.querySelector(".overlay")?.classList.add("close");

    store.movies = [];

    renderMoviesList();
  }
});
