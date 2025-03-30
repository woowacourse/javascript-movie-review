import Header from "./shared/ui/components/Header";
import { CustomButton } from "./shared/ui/components/CustomButton";
import { showSkeletons } from "./shared/ui/renderers/showSkeletons";
import { addMoviePost } from "./shared/ui/renderers/addMoviePost";
import { addMoreMovies } from "./shared/domain/addMoreMovies";
import { updateSearchPageUI } from "./features/search/ui/handlers/searchFormSubmitHandler";
import { showErrorPage } from "./shared/ui/renderers/showErrorPage";
import { getQueryParam } from "./shared/domain/getParams";
import { setParams } from "./shared/domain/setParams";
import { pageManager } from "./shared/domain/pageManager";
import { getCurrentMovieList } from "./shared/domain/getCurrentMovieList";

addEventListener("DOMContentLoaded", async () => {
  const $movieList = document.querySelector(".thumbnail-list") as HTMLElement;

  await initMovieList($movieList);
  await initAddMoreMoviesButton($movieList);
});

async function initMovieList(movieList: HTMLElement) {
  try {
    showSkeletons(movieList);

    const query = getQueryParam(new URL(window.location.href));
    const movies = await getCurrentMovieList(pageManager.currentPage, query);

    if (!movies || !movieList) return;

    pageManager.setTotalPages(movies.total_pages);
    Header(movies.results[0]);

    if (query) {
      updateSearchPageUI(movies.results, query, {
        pageNum: pageManager.currentPage,
        totalPages: pageManager.totalPages,
      });
    } else {
      setParams("");
      movieList.innerHTML = "";
      addMoviePost(movies.results, movieList);
    }
  } catch (error) {
    showErrorPage();
  }
}

async function initAddMoreMoviesButton(movieList: HTMLElement) {
  if (pageManager.totalPages === pageManager.currentPage) return;

  const $movieContainer = document.getElementById("movie-container");
  if (!$movieContainer) return;

  const addMoreMoviesButton = CustomButton({
    title: "더보기",
    className: "add-more-button",
    id: "more-movies-button",
  });

  $movieContainer.appendChild(addMoreMoviesButton);

  const $moreMoviesButton = document.getElementById("more-movies-button");
  if (!$moreMoviesButton) return;

  $moreMoviesButton.addEventListener("click", async () => {
    if (!movieList) return;
    await addMoreMovies(movieList);
  });
}
