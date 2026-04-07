import {
  initialRender,
  searchRender,
} from "./features/handler/controllerHandlers";
import { movieState } from "./features/states/movieState";
import { getSearchInputValue } from "./features/handler/renderHandlers";
import { initEvents } from "./features/handler/eventHandlers";

addEventListener("load", async () => {
  // 초기 렌더링
  await initialRender(movieState.page);

  // 검색
  const submitContainer = document.querySelector(
    ".background-container",
  ) as HTMLFormElement;

  submitContainer.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();
    movieState.page = 1;

    movieState.searchMovie = getSearchInputValue();

    // 검색어가 없는 경우 초기 렌더링
    if (movieState.searchMovie === "") {
      await initialRender(movieState.page);
      return;
    }

    // 검색어가 있는 경우 검색 결과 렌더링
    await searchRender(movieState.page, movieState.searchMovie);
  });

  initEvents();
});
