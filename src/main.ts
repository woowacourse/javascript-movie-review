import { handleInitial, handleSearch } from "./features/handler/controllerHandlers";
import { setupSubscriptions } from "./init";

const mainTitle = document.querySelector(".main-title") as HTMLElement;

setupSubscriptions(mainTitle);

addEventListener("load", async () => {
  await handleInitial();
});

const submitContainer = document.querySelector(".background-container") as HTMLFormElement;

submitContainer.addEventListener("submit", async (e: SubmitEvent) => {
  e.preventDefault();
  const searchInput = document.querySelector(".search-input") as HTMLInputElement;
  await handleSearch(searchInput.value.trim());
});

