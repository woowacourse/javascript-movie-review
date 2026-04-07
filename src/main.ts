import { initialRender, renderSearchResults } from "./features/movieController";
import { movieState } from "./features/movieState";
import { Header } from "./features/View/Header";
import { initEvents } from "./features/handler";

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

    movieState.searchQuery = Header.getSearchInputValue();

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
