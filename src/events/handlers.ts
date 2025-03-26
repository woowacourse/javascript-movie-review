import { Main } from "../components";
import { updateMoviesList } from "../domains/renderMoviesList";
import { store } from "../stores";
import { isElement } from "./guards";

window.addEventListener("click", async (event) => {
  const { target } = event;

  if (!isElement(target) || !target.closest(".show-more")) return;

  store.page = store.page + 1;
  updateMoviesList();
});

window.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { target } = event;

  if (!isElement(target) || !target.closest(".top-rated-search")) return;

  const $searchInput = target.querySelector(
    ".top-rated-search-input"
  ) as HTMLInputElement;
  const value = $searchInput?.value;

  (target as HTMLFormElement).reset();

  if (!value) return;

  store.searchKeyword = value;
  store.page = 1;
  store.movies = [];

  Main.getInstance().render({
    title: `"${store.searchKeyword}" 검색 결과`,
  });

  // TODO: Header 변경 로직 분리
  const $topRatedContainer = document.querySelector(".top-rated-container");
  const $overlay = document.querySelector(".overlay");
  $topRatedContainer?.classList.add("close");
  $overlay?.classList.add("close");

  await updateMoviesList();
});
