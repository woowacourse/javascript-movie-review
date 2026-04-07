import { movieState } from "../states/movieState";
import { initialRender, moreRender } from "./controllerHandlers";
import { updateMoreButton } from "./renderHandlers";

export function initEvents() {
  const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;
  const header = document.querySelector(".header") as HTMLElement;

  header.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    if (target.closest(".logo")) {
      movieState.reset();
      await initialRender(movieState.page, moreButton, updateMoreButton);
    }
  });

  // 더보기 버튼
  moreButton.addEventListener("click", async () => {
    movieState.page += 1;
    await moreRender(
      movieState.page,
      movieState.searchMovie,
      moreButton,
      updateMoreButton,
    );
  });
}
