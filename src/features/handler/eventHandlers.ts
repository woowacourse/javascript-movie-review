import { movieState } from "../states/movieState";
import { initialRender, moreRender } from "./controllerHandlers";
import { updateMoreButton } from "./renderHandlers";

export function initEvents() {
  const logo = document.querySelector(".logo") as HTMLElement;
  const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;

  // 로고 클릭 시
  logo.addEventListener("click", async () => {
    movieState.page = 1;
    movieState.searchMovie = "";
    await initialRender(movieState.page, moreButton, updateMoreButton);
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
