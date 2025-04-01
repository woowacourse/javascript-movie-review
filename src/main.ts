import Header from "./shared/ui/components/Header";
import { showSkeletons } from "./shared/ui/renderers/showSkeletons";
import { addMoviePost } from "./shared/ui/renderers/addMoviePost";
import { updateSearchPageUI } from "./features/search/ui/renderers/updateSearchPageUI";
import { showErrorPage } from "./shared/ui/renderers/showErrorPage";
import { getQueryParam } from "./shared/utils/getParams";
import { setParams } from "./shared/utils/setParams";
import { pageManager } from "./shared/domain/pageManager";
import { getCurrentMovieList } from "./shared/domain/getCurrentMovieList";
import { initInfiniteScroll } from "./shared/observer/infiniteScroll";

addEventListener("DOMContentLoaded", async () => {
  const $movieList = document.querySelector(".thumbnail-list") as HTMLElement;

  await initMovieList($movieList);
  initInfiniteScroll();
});

async function initMovieList(movieList: HTMLElement) {
  try {
    showSkeletons(movieList);

    const query = getQueryParam(new URL(window.location.href), "query");
    const movies = await getCurrentMovieList(pageManager.currentPage, query);

    if (!movies) return;

    pageManager.setTotalPages(movies.totalPages);
    Header(movies.results[0]);

    if (query) {
      updateSearchPageUI(movies.results, query, {
        pageNum: pageManager.currentPage,
        totalPages: pageManager.totalPages,
      });
    } else {
      setParams("", "query");
      movieList.innerHTML = "";
      addMoviePost(movies.results, movieList);
    }
  } catch (error) {
    showErrorPage();
  }
}
