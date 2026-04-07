import { movieState } from "../states/movieState";
import { initialRender, renderMoreMovies } from "./controllerHandlers";

export function initEvents() {
  const header = document.querySelector(".header") as HTMLElement;

  header.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    if (target.closest(".logo")) {
      movieState.reset();
      await initialRender(movieState.page);
    }
  });

  // 더보기 버튼
  const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;
  if (moreButton) {
    moreButton.addEventListener("click", async () => {
      movieState.page += 1;
      await renderMoreMovies(movieState.page, movieState.searchQuery);
    });
  }
}
