import {
  initialRender,
  moreRender,
  searchRender,
} from "./features/handler/controllerHandlers";
import { state } from "./state";
import { eventBus, APP_EVENTS } from "./pubsub/EventBus";
import { updateMoreButton } from "./utils/dom";

const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;

eventBus.subscribe(APP_EVENTS.MOVIES_LOADED, (data) => {
  updateMoreButton(moreButton, data.total_pages, state.page);
});

eventBus.subscribe(APP_EVENTS.SEARCH_LOADED, (data) => {
  updateMoreButton(moreButton, data.total_pages, state.page);
});

eventBus.subscribe(APP_EVENTS.MORE_LOADED, (data) => {
  updateMoreButton(moreButton, data.total_pages, state.page);
});

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

  const logo = document.querySelector(".logo") as HTMLElement;
  logo.addEventListener("click", async () => {
    state.page = 1;
    state.searchQuery = "";
    await initialRender(state.page);
  });
});

moreButton.addEventListener("click", async () => {
  state.page += 1;
  await moreRender(state.page, state.searchQuery);
});
