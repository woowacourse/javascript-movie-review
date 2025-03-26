import Header from "../components/Layout/Header";
import Main from "../components/Layout/Main";
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

  Header.getInstance().setState({ hasSearched: true });
  await updateMoviesList();
});
