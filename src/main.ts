import {
  loadPopular,
  loadMore,
  handleSearch,
} from "./features/handler/controllerHandlers";
import { state } from "./state";
import { setupSubscriptions } from "./init";

const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;
const mainTitle = document.querySelector(".main-title") as HTMLElement;

setupSubscriptions(moreButton, mainTitle);

addEventListener("load", async () => {
  await loadPopular(state.page);
});

const submitContainer = document.querySelector(
  ".background-container",
) as HTMLFormElement;

submitContainer.addEventListener("submit", async (e: SubmitEvent) => {
  e.preventDefault();
  const searchInput = document.querySelector(".search-input") as HTMLInputElement;
  await handleSearch(searchInput.value.trim());
});

moreButton.addEventListener("click", async () => {
  state.page += 1;
  await loadMore(state.page, state.searchQuery);
});
