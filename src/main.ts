import {
  initialRender,
  moreRender,
  searchRender,
} from "./features/handler/controllerHandlers";
import { state } from "./state";
import { setupSubscriptions } from "./init";

const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;
const mainTitle = document.querySelector(".main-title") as HTMLElement;

setupSubscriptions(moreButton, mainTitle);

addEventListener("load", async () => {
  await initialRender(state.page);

  const submitContainer = document.querySelector(
    ".background-container",
  ) as HTMLFormElement;

  submitContainer.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();
    state.page = 1;

    const searchInput = document.querySelector(
      ".search-input",
    ) as HTMLInputElement;
    state.searchQuery = searchInput.value.trim();

    if (state.searchQuery === "") {
      await initialRender(state.page);
      return;
    }

    await searchRender(state.page, state.searchQuery);
  });
});

moreButton.addEventListener("click", async () => {
  state.page += 1;
  await moreRender(state.page, state.searchQuery);
});
