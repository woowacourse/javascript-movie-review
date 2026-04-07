import {
  initialRender,
  renderSearchResults,
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

    movieState.searchQuery = getSearchInputValue();

    // 검색어가 없는 경우 초기 렌더링
    if (movieState.searchQuery === "") {
      await initialRender(movieState.page);
      return;
    }

    // 검색어가 있는 경우 검색 결과 렌더링
    await renderSearchResults(movieState.page, movieState.searchQuery);
  });

  initEvents();
});
