import {
  handleInitial,
  handleSearch,
  // handleMore,
} from "./features/handler/controllerHandlers";
import { setupSubscriptions } from "./init";

// const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;
const mainTitle = document.querySelector(".main-title") as HTMLElement;

setupSubscriptions(mainTitle);

addEventListener("load", async () => {
  await handleInitial();
});

const submitContainer = document.querySelector(
  ".background-container",
) as HTMLFormElement;

submitContainer.addEventListener("submit", async (e: SubmitEvent) => {
  e.preventDefault();
  const searchInput = document.querySelector(".search-input") as HTMLInputElement;
  await handleSearch(searchInput.value.trim());
});

// moreButton.addEventListener("click", async () => {
//   await handleMore();
// });
