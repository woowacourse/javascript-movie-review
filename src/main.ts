import {
  initialRender,
  moreRender,
  searchRender,
} from "./features/handler/controllerHandlers";
import { state } from "./state";

const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;

addEventListener("load", async () => {
  await initialRender(state.page, moreButton, updateMoreButton);

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
      await initialRender(state.page, moreButton, updateMoreButton);
      return;
    }

    await searchRender(state.page, state.searchQuery, moreButton, updateMoreButton);
  });

  const logo = document.querySelector(".logo") as HTMLElement;
  logo.addEventListener("click", async () => {
    state.page = 1;
    state.searchQuery = "";
    await initialRender(state.page, moreButton, updateMoreButton);
  });
});

moreButton.addEventListener("click", async () => {
  state.page += 1;
  await moreRender(state.page, state.searchQuery, moreButton, updateMoreButton);
});

function updateMoreButton(
  moreButton: HTMLButtonElement,
  data: { results: unknown[]; total_pages: number },
): void {
  if (data.total_pages === state.page) {
    moreButton.style.display = "none";
  } else {
    moreButton.style.display = "block";
  }
}
