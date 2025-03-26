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
  if (!value) return;

  (target as HTMLFormElement).reset();

  store.searchKeyword = value;
  store.page = 1;
  store.movies = [];

  const main = Main.getInstance();
  main.setState({
    title: `"${store.searchKeyword}" 검색 결과`,
    isLoading: true,
  });

  // TODO: Header 변경 로직 분리
  const $topRatedContainer = document.querySelector(".top-rated-container");
  const $overlay = document.querySelector(".overlay");
  $topRatedContainer?.classList.add("close");
  $overlay?.classList.add("close");

  await updateMoviesList();
});
